const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { WebSocketServer, WebSocket } = require('ws');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

// GIỚI HẠN PHÒNG & THỜI GIAN CHỜ KICK
const MAX_ROOM_USERS = 10;     // Tăng lên tối đa 10 người/phòng
const KICK_TIMEOUT_MS = 90000; // 90 giây ngắt kết nối không quay lại thì kick

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({ name, address: iface.address });
      }
    }
  }
  return addresses;
}

// -------------------------------------------------------------
// 1. Static HTTP Server
// -------------------------------------------------------------
let currentTunnelUrl = null;

const server = http.createServer((req, res) => {
  let safePath = req.url.split('?')[0];

  if (safePath === '/api/tunnel-url') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify({ url: currentTunnelUrl }));
  }

  if (safePath === '/' || safePath === '') safePath = '/index.html';

  const filePath = path.join(ROOT_DIR, path.normalize(safePath));
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

// -------------------------------------------------------------
// 2. Real-Time WebSocket Server (10 Người + Grace Period Auto-Kick)
// -------------------------------------------------------------
const wss = new WebSocketServer({ server });

// Map: roomId -> Room object
const rooms = new Map();

function getOrCreateRoom(roomId) {
  const id = (roomId || 'SHDC').trim().toUpperCase();
  if (!rooms.has(id)) {
    rooms.set(id, {
      id,
      members: new Map(), // userId -> Member object { id, name, isHost, ws, status, kickTimer, disconnectAt }
      quizState: null,    // current active synchronized quiz state
      messages: []        // chat history
    });
  }
  return rooms.get(id);
}

function broadcastToRoom(room, data, excludeWs = null) {
  const payload = JSON.stringify(data);
  for (const member of room.members.values()) {
    if (member.ws && member.ws !== excludeWs && member.ws.readyState === WebSocket.OPEN) {
      member.ws.send(payload);
    }
  }
}

function getMemberList(room) {
  return Array.from(room.members.values()).map(m => ({
    id: m.id,
    name: m.name,
    isHost: m.isHost,
    status: m.status // 'online' hoặc 'offline'
  }));
}

function kickMember(room, userId) {
  const member = room.members.get(userId);
  if (!member) return;

  if (member.kickTimer) {
    clearTimeout(member.kickTimer);
    member.kickTimer = null;
  }

  room.members.delete(userId);
  console.log(`[Kick] ${member.name} (id:${userId}) bị kick do out quá ${KICK_TIMEOUT_MS/1000}s`);

  // Nếu người bị kick là host thì chuyển quyền host cho người online đầu tiên
  if (member.isHost && room.members.size > 0) {
    const firstOnline = Array.from(room.members.values()).find(m => m.status === 'online') || Array.from(room.members.values())[0];
    if (firstOnline) firstOnline.isHost = true;
  }

  broadcastToRoom(room, {
    type: 'user_kicked',
    userId: member.id,
    userName: member.name,
    members: getMemberList(room),
    message: `${member.name} đã bị kick khỏi phòng do ngắt kết nối quá ${KICK_TIMEOUT_MS/1000} giây.`
  });

  // Nếu phòng không còn ai thì xoá phòng
  if (room.members.size === 0) {
    rooms.delete(room.id);
  }
}

wss.on('connection', (ws) => {
  let currentRoom = null;
  let currentUserId = null;

  // Heartbeat ping-pong để giữ kết nối sống trên mobile
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);

      switch (msg.type) {
        // --- 1. THAM GIA HOẶC KẾT NỐI LẠI PHÒNG (RECONNECT) ---
        case 'join_room': {
          const roomId = (msg.roomId || 'SHDC').trim().toUpperCase();
          const room = getOrCreateRoom(roomId);
          const userId = (msg.userId || '').trim() || 'u_' + Math.random().toString(36).substring(2, 9);
          const userName = (msg.userName || 'Bạn học').trim().substring(0, 20);

          currentRoom = room;
          currentUserId = userId;

          // Kiểm tra xem đây có phải là người cũ kết nối lại (Reconnect) không
          let member = room.members.get(userId);

          if (member) {
            // HỦY BỎ LỆNH KICK vì bạn ấy đã quay lại trước thời hạn!
            if (member.kickTimer) {
              clearTimeout(member.kickTimer);
              member.kickTimer = null;
            }
            member.ws = ws;
            member.status = 'online';
            member.disconnectAt = null;
            if (userName) member.name = userName;

            console.log(`[Reconnect] ${member.name} đã kết nối lại phòng ${room.id} (${room.members.size}/${MAX_ROOM_USERS})`);

            ws.send(JSON.stringify({
              type: 'room_joined',
              roomId: room.id,
              user: { id: member.id, name: member.name, isHost: member.isHost },
              members: getMemberList(room),
              quizState: room.quizState,
              messages: room.messages.slice(-30),
              reconnected: true
            }));

            broadcastToRoom(room, {
              type: 'user_status_changed',
              userId: member.id,
              userName: member.name,
              status: 'online',
              members: getMemberList(room),
              message: `${member.name} đã kết nối lại phòng!`
            }, ws);

          } else {
            // Người mới tham gia: kiểm tra xem phòng đã đủ 10 người chưa
            if (room.members.size >= MAX_ROOM_USERS) {
              ws.send(JSON.stringify({
                type: 'error',
                message: `Phòng ${roomId} đã đủ tối đa 10 người!`
              }));
              return;
            }

            const isFirstUser = room.members.size === 0;
            member = {
              id: userId,
              name: userName,
              isHost: isFirstUser,
              ws: ws,
              status: 'online',
              kickTimer: null,
              disconnectAt: null,
              joinedAt: Date.now()
            };
            room.members.set(userId, member);

            console.log(`[Join] ${member.name} tham gia phòng ${room.id} (${room.members.size}/${MAX_ROOM_USERS})`);

            ws.send(JSON.stringify({
              type: 'room_joined',
              roomId: room.id,
              user: { id: member.id, name: member.name, isHost: member.isHost },
              members: getMemberList(room),
              quizState: room.quizState,
              messages: room.messages.slice(-30),
              reconnected: false
            }));

            broadcastToRoom(room, {
              type: 'user_joined',
              user: { id: member.id, name: member.name, isHost: member.isHost },
              members: getMemberList(room),
              message: `${member.name} vừa tham gia phòng!`
            }, ws);
          }
          break;
        }

        // --- 2. BẮT ĐẦU HOẶC ĐỒNG BỘ QUIZ TRONG PHÒNG ---
        case 'sync_start_quiz': {
          if (!currentRoom) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';

          currentRoom.quizState = {
            chapterId: msg.chapterId,
            chapterTitle: msg.chapterTitle,
            questions: msg.questions,
            currentIndex: 0,
            userAnswers: {},
            startedBy: byName,
            timestamp: Date.now()
          };

          broadcastToRoom(currentRoom, {
            type: 'quiz_started',
            quizState: currentRoom.quizState,
            userName: byName
          });
          break;
        }

        // --- 3. ĐỒNG BỘ CHỌN ĐÁP ÁN (AI CHỌN THÌ BÊN KIA CŨNG BỊ CHỌN THEO) ---
        case 'sync_select_option': {
          if (!currentRoom || !currentRoom.quizState) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';
          const { qIndex, optIndex, isCorrect } = msg;

          currentRoom.quizState.userAnswers[qIndex] = {
            selectedIndex: optIndex,
            isCorrect: isCorrect,
            selectedBy: byName
          };

          broadcastToRoom(currentRoom, {
            type: 'option_selected',
            qIndex,
            optIndex,
            isCorrect,
            userName: byName
          });
          break;
        }

        // --- 4. ĐỒNG BỘ CHUYỂN CÂU HỎI (TIẾP TỤC / QUAY LẠI) ---
        case 'sync_nav_question': {
          if (!currentRoom || !currentRoom.quizState) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';

          currentRoom.quizState.currentIndex = msg.qIndex;
          broadcastToRoom(currentRoom, {
            type: 'question_navigated',
            qIndex: msg.qIndex,
            userName: byName
          });
          break;
        }

        // --- 5. ĐỒNG BỘ XÁO TRỘN CÂU HỎI ---
        case 'sync_shuffle_quiz': {
          if (!currentRoom || !currentRoom.quizState) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';

          currentRoom.quizState.questions = msg.questions;
          currentRoom.quizState.currentIndex = 0;
          currentRoom.quizState.userAnswers = {};

          broadcastToRoom(currentRoom, {
            type: 'quiz_shuffled',
            questions: msg.questions,
            userName: byName
          });
          break;
        }

        // --- 6. CHAT & TRÒ CHUYỆN THỜI GIAN THỰC ---
        case 'chat_message': {
          if (!currentRoom) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';
          const text = (msg.text || '').trim().substring(0, 300);
          if (!text) return;

          const chatItem = {
            id: 'm_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            userId: currentUserId,
            userName: byName,
            text: text,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          };

          currentRoom.messages.push(chatItem);
          if (currentRoom.messages.length > 100) currentRoom.messages.shift();

          broadcastToRoom(currentRoom, {
            type: 'chat_broadcast',
            message: chatItem
          });
          break;
        }

        // --- 7. THẢ REACTION / EMOJI NHANH BAY LÊN MÀN HÌNH ---
        case 'send_reaction': {
          if (!currentRoom) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';

          broadcastToRoom(currentRoom, {
            type: 'reaction_broadcast',
            emoji: msg.emoji || '👍',
            userName: byName
          });
          break;
        }

        // --- 8. CHỦ ĐỘNG RỜI PHÒNG (BẤM NÚT "RỜI PHÒNG") ---
        case 'leave_room': {
          if (currentRoom && currentUserId) {
            const member = currentRoom.members.get(currentUserId);
            if (member) {
              if (member.kickTimer) clearTimeout(member.kickTimer);
              currentRoom.members.delete(currentUserId);
              if (member.isHost && currentRoom.members.size > 0) {
                const first = Array.from(currentRoom.members.values()).find(m => m.status === 'online') || Array.from(currentRoom.members.values())[0];
                if (first) first.isHost = true;
              }
              broadcastToRoom(currentRoom, {
                type: 'user_left',
                userId: currentUserId,
                userName: member.name,
                members: getMemberList(currentRoom),
                message: `${member.name} đã rời phòng.`
              });
              if (currentRoom.members.size === 0) {
                rooms.delete(currentRoom.id);
              }
            }
            currentRoom = null;
            currentUserId = null;
          }
          break;
        }
      }
    } catch (e) {
      console.error('[WS Error]', e);
    }
  });

  // --- KHI MẤT KẾT NỐI (ĐỔI TAB, KHÓA MÀN HÌNH, REFRESH TRANG, RỚT MẠNG TẠM THỜI) ---
  ws.on('close', () => {
    if (currentRoom && currentUserId) {
      const member = currentRoom.members.get(currentUserId);
      if (member && member.ws === ws) {
        // Đánh dấu tạm thời offline & giữ nguyên slot trong phòng!
        member.ws = null;
        member.status = 'offline';
        member.disconnectAt = Date.now();

        console.log(`[Disconnect] ${member.name} tạm ngắt kết nối. Đếm ngược ${KICK_TIMEOUT_MS/1000}s để kick...`);

        // Báo cho cả phòng biết bạn này đang tạm ngắt kết nối
        broadcastToRoom(currentRoom, {
          type: 'user_status_changed',
          userId: member.id,
          userName: member.name,
          status: 'offline',
          timeoutSeconds: KICK_TIMEOUT_MS / 1000,
          members: getMemberList(currentRoom),
          message: `${member.name} tạm ngắt kết nối (giữ chỗ trong ${KICK_TIMEOUT_MS/1000}s)...`
        });

        // Bắt đầu hẹn giờ: nếu quá thời gian không quay lại thì KICK
        member.kickTimer = setTimeout(() => {
          kickMember(currentRoom, member.id);
        }, KICK_TIMEOUT_MS);
      }
    }
  });
});

// Định kỳ ping mỗi 25s để giữ kết nối không bị nhà mạng hay trình duyệt mobile ngắt
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 25000);

function startCloudflareTunnel(port) {
  const { spawn } = require('child_process');
  const fs = require('fs');
  const path = require('path');

  const candidates = [
    'cloudflared',
    'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe',
    'C:\\Program Files\\cloudflared\\cloudflared.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'cloudflared', 'cloudflared.exe')
  ];

  let cfPath = 'cloudflared';
  for (const c of candidates) {
    if (c !== 'cloudflared' && fs.existsSync(c)) {
      cfPath = c;
      break;
    }
  }

  console.log('⏳ Đang khởi tạo Cloudflare Tunnel (tạo link online không cần IP)...');

  try {
    const tunnel = spawn(cfPath, ['tunnel', '--url', `http://localhost:${port}`]);

    const handleOutput = (chunk) => {
      const text = chunk.toString();
      const match = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
      if (match && !currentTunnelUrl) {
        currentTunnelUrl = match[0];
        console.log('====================================================');
        console.log('   🌐 LINK ONLINE (KHÔNG CẦN ĐỊA CHỈ IP - DÙNG 4G/WI-FI TÙY Ý):');
        console.log(`   👉 ${currentTunnelUrl}`);
        console.log('   (Gửi link này cho bạn bè qua Messenger/Zalo để vào phòng)');
        console.log('====================================================\n');
      }
    };

    tunnel.stdout.on('data', handleOutput);
    tunnel.stderr.on('data', handleOutput);

    tunnel.on('error', () => {
      // Bỏ qua nếu môi trường không có cloudflared
    });

    const cleanup = () => {
      try { tunnel.kill(); } catch (e) {}
    };
    process.on('exit', cleanup);
    process.on('SIGINT', () => {
      cleanup();
      process.exit();
    });
  } catch (e) {}
}

// -------------------------------------------------------------
// 3. Start Server
// -------------------------------------------------------------
server.listen(PORT, '0.0.0.0', () => {
  const ips = getLocalIpAddresses();
  console.log('====================================================');
  console.log('   🎉 QUIZ SINH HỌC A1 - WEB & LIVE CO-OP SERVER');
  console.log(`   ⚡ Giới hạn: ${MAX_ROOM_USERS} người/phòng`);
  console.log(`   ⏳ Tự động kick nếu out quá ${KICK_TIMEOUT_MS/1000}s`);
  console.log('====================================================\n');
  console.log(`💻 Trên máy của bạn:`);
  console.log(`   👉 http://localhost:${PORT}\n`);

  if (ips.length > 0) {
    console.log(`📱 Mạng nội bộ Wi-Fi (nếu cùng bắt 1 mạng Wi-Fi):`);
    ips.forEach(ip => {
      console.log(`   👉 http://${ip.address}:${PORT}  (${ip.name})`);
    });
    console.log('');
  }

  console.log('💡 Bấm Ctrl + C trong cửa sổ này để tắt server.');
  console.log('====================================================\n');

  // Khởi động Cloudflare Tunnel khi chạy local trên máy tính (nếu không phải môi trường Cloud như Render)
  if (!process.env.RENDER && !process.env.RAILWAY_STATIC_URL && !process.env.VERCEL && process.env.NODE_ENV !== 'production') {
    startCloudflareTunnel(PORT);
  }
});
