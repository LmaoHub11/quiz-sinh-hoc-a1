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

  if (safePath === '/api/active-rooms') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify(getActiveRoomsList()));
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

function getOrCreateRoom(roomId, options = {}) {
  const id = (roomId || 'SHDC').trim().toUpperCase();
  if (!rooms.has(id)) {
    rooms.set(id, {
      id,
      name: id,
      members: new Map(), // userId -> Member object { id, name, isHost, ws, status, kickTimer, disconnectAt }
      quizState: null,    // current active synchronized quiz state
      messages: [],       // chat history
      mode: options.mode || 'coop',
      timerSeconds: options.timerSeconds || 30,
      subjectId: options.subjectId || null,
      subjectTitle: options.subjectTitle || null,
      createdAt: Date.now()
    });
  } else if (options.subjectId || options.mode) {
    const r = rooms.get(id);
    if (options.subjectId && !r.subjectId) r.subjectId = options.subjectId;
    if (options.subjectTitle && !r.subjectTitle) r.subjectTitle = options.subjectTitle;
    if (options.mode) r.mode = options.mode;
    if (options.timerSeconds) r.timerSeconds = options.timerSeconds;
  }
  return rooms.get(id);
}

function getActiveRoomsList() {
  const list = [];
  for (const room of rooms.values()) {
    if (room.members.size > 0) {
      const host = Array.from(room.members.values()).find(m => m.isHost) || Array.from(room.members.values())[0];
      const onlineCount = Array.from(room.members.values()).filter(m => m.status === 'online').length;
      list.push({
        id: room.id,
        name: room.name || room.id,
        hostName: host ? host.name : 'Chủ phòng',
        memberCount: room.members.size,
        onlineCount: onlineCount,
        maxMembers: MAX_ROOM_USERS,
        mode: room.mode || (room.quizState ? room.quizState.mode : 'coop'),
        timerSeconds: room.timerSeconds || (room.quizState ? room.quizState.timerSeconds : 30),
        subjectId: room.quizState ? room.quizState.subjectId : (room.subjectId || null),
        subjectTitle: room.quizState ? room.quizState.subjectTitle : (room.subjectTitle || 'Chưa chọn môn'),
        chapterTitle: room.quizState ? room.quizState.chapterTitle : '',
        questionCount: room.quizState && room.quizState.questions ? room.quizState.questions.length : 0,
        currentQuestionIndex: room.quizState ? (room.quizState.currentIndex || 0) : 0,
        hasStarted: !!(room.quizState && room.quizState.questions && room.quizState.questions.length > 0),
        createdAt: room.createdAt || Date.now()
      });
    }
  }
  list.sort((a, b) => b.onlineCount - a.onlineCount || a.id.localeCompare(b.id));
  return list;
}

function broadcastActiveRooms() {
  const payload = JSON.stringify({
    type: 'active_rooms_update',
    rooms: getActiveRoomsList()
  });
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
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
    isHost: !!m.isHost,
    status: m.status || 'online',       // 'online' hoặc 'offline'
    activity: m.activity || 'active',   // 'active' (đang ở tab) hoặc 'away' (chuyển tab)
    answerStatus: m.answerStatus || 'thinking', // 'thinking' (đang suy nghĩ) hoặc 'answered' (đã chọn)
    score: m.score || 0,
    streak: m.streak || 0,
    voiceActive: !!m.voiceActive,
    voiceMuted: !!m.voiceMuted
  }));
}

function kickMember(room, userId) {
  const member = room.members.get(userId);
  if (!member) return;

  if (member.kickTimer) {
    clearTimeout(member.kickTimer);
    member.kickTimer = null;
  }

  const wasHost = member.isHost;
  room.members.delete(userId);
  console.log(`[Kick] ${member.name} (id:${userId}) bị kick do out quá ${KICK_TIMEOUT_MS/1000}s`);

  // Nếu người bị kick là host thì tự động chuyển quyền host cho thành viên online tiếp theo
  let newHost = null;
  if (wasHost && room.members.size > 0) {
    newHost = Array.from(room.members.values()).find(m => m.status === 'online') || Array.from(room.members.values())[0];
    if (newHost) {
      newHost.isHost = true;
      console.log(`[Host Transfer] Quyền host chuyển sang cho ${newHost.name}`);
    }
  }

  broadcastToRoom(room, {
    type: 'user_kicked',
    userId: member.id,
    userName: member.name,
    newHostId: newHost ? newHost.id : null,
    newHostName: newHost ? newHost.name : null,
    members: getMemberList(room),
    message: `${member.name} đã bị kick khỏi phòng do ngắt kết nối quá ${KICK_TIMEOUT_MS/1000} giây.`
  });

  if (newHost) {
    broadcastToRoom(room, {
      type: 'host_transferred',
      newHostId: newHost.id,
      newHostName: newHost.name,
      members: getMemberList(room),
      message: `👑 Host cũ đã vắng mặt quá 90 giây. ${newHost.name} hiện là Host mới của phòng!`
    });
  }

  // Nếu phòng không còn ai thì xoá phòng
  if (room.members.size === 0) {
    rooms.delete(room.id);
  }

  broadcastActiveRooms();
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
        // --- 0. LẤY DANH SÁCH PHÒNG ĐANG HOẠT ĐỘNG (LOBBY) ---
        case 'get_active_rooms': {
          ws.send(JSON.stringify({
            type: 'active_rooms_update',
            rooms: getActiveRoomsList()
          }));
          break;
        }

        // --- 1. THAM GIA HOẶC KẾT NỐI LẠI PHÒNG (RECONNECT) ---
        case 'join_room': {
          const roomId = (msg.roomId || 'SHDC').trim().toUpperCase();
          const room = getOrCreateRoom(roomId, {
            subjectId: msg.subjectId,
            subjectTitle: msg.subjectTitle,
            mode: msg.mode,
            timerSeconds: msg.timerSeconds
          });
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
            member.activity = 'active';
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
              activity: 'active',
              members: getMemberList(room),
              message: `${member.name} đã kết nối lại phòng!`
            }, ws);

            broadcastActiveRooms();

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
              activity: 'active',
              answerStatus: 'thinking',
              score: 0,
              streak: 0,
              voiceActive: false,
              voiceMuted: false,
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

            broadcastActiveRooms();
          }
          break;
        }

        // --- 2. BẮT ĐẦU HOẶC ĐỒNG BỘ QUIZ TRONG PHÒNG (CO-OP HOẶC VERSUS) ---
        case 'sync_start_quiz': {
          if (!currentRoom) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';

          const mode = msg.mode === 'versus' ? 'versus' : 'coop';
          const timerSeconds = parseInt(msg.timerSeconds, 10) || 30;

          // Reset điểm số và trạng thái trả lời của toàn bộ thành viên
          for (const m of currentRoom.members.values()) {
            m.score = 0;
            m.streak = 0;
            m.answerStatus = 'thinking';
          }

          currentRoom.mode = mode;
          currentRoom.timerSeconds = timerSeconds;
          if (msg.subjectId) currentRoom.subjectId = msg.subjectId;
          if (msg.subjectTitle) currentRoom.subjectTitle = msg.subjectTitle;

          currentRoom.quizState = {
            subjectId: msg.subjectId,
            subjectTitle: msg.subjectTitle,
            chapterId: msg.chapterId,
            chapterTitle: msg.chapterTitle,
            questions: msg.questions,
            currentIndex: 0,
            userAnswers: {},
            playerAnswers: {}, // userId -> { optIndex, isCorrect, points }
            mode: mode,
            timerSeconds: timerSeconds,
            startedBy: byName,
            timestamp: Date.now()
          };

          broadcastToRoom(currentRoom, {
            type: 'quiz_started',
            quizState: currentRoom.quizState,
            members: getMemberList(currentRoom),
            userName: byName
          });

          broadcastActiveRooms();
          break;
        }

        // --- 3. ĐỒNG BỘ CHỌN ĐÁP ÁN (CO-OP MODE: AI CHỌN THÌ CẢ PHÒNG CHỌN THEO) ---
        case 'sync_select_option': {
          if (!currentRoom || !currentRoom.quizState) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';
          const { qIndex, optIndex, isCorrect } = msg;

          if (member) member.answerStatus = 'answered';

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
            userName: byName,
            members: getMemberList(currentRoom)
          });
          break;
        }

        // --- 3B. ĐẤU ĐIỂM (VERSUS / RACE MODE): MỖI NGƯỜI TỰ BẤM CHỌN VÀ TÍNH ĐIỂM THEO TỐC ĐỘ ---
        case 'versus_submit_answer': {
          if (!currentRoom || !currentRoom.quizState) return;
          const member = currentRoom.members.get(currentUserId);
          if (!member) return;

          const { qIndex, optIndex, isCorrect, timeLeft, totalTime } = msg;

          // Tính điểm:
          // Trả lời đúng trong 3 giây đầu nhận tối đa 1000 điểm; thời gian còn lại điểm giảm dần về tối thiểu 200đ
          let points = 0;
          if (isCorrect) {
            const t = Math.max(0, timeLeft !== undefined ? timeLeft : 0);
            const tot = totalTime || 30;
            if (t >= tot - 3) {
              points = 1000;
            } else {
              const remainingRatio = t / Math.max(1, tot - 3);
              points = Math.max(200, Math.round(200 + 800 * remainingRatio));
            }
            member.streak = (member.streak || 0) + 1;
            // Thưởng thêm chuỗi đúng (Streak bonus)
            const streakBonus = Math.min(250, (member.streak - 1) * 50);
            points += streakBonus;
          } else {
            points = 0;
            member.streak = 0;
          }

          member.score = (member.score || 0) + points;
          member.answerStatus = 'answered';

          if (!currentRoom.quizState.playerAnswers) {
            currentRoom.quizState.playerAnswers = {};
          }
          currentRoom.quizState.playerAnswers[currentUserId] = {
            optIndex,
            isCorrect,
            points,
            score: member.score,
            streak: member.streak
          };

          const onlineMembers = Array.from(currentRoom.members.values()).filter(m => m.status === 'online');
          const allAnswered = onlineMembers.length > 0 && onlineMembers.every(m => m.answerStatus === 'answered');

          broadcastToRoom(currentRoom, {
            type: 'versus_answer_recorded',
            userId: currentUserId,
            userName: member.name,
            qIndex,
            isCorrect,
            points,
            score: member.score,
            streak: member.streak,
            members: getMemberList(currentRoom),
            allAnswered: allAnswered,
            playerAnswers: allAnswered ? currentRoom.quizState.playerAnswers : undefined
          });
          break;
        }

        // --- 4. ĐỒNG BỘ CHUYỂN CÂU HỎI ---
        case 'sync_nav_question': {
          if (!currentRoom || !currentRoom.quizState) return;
          const member = currentRoom.members.get(currentUserId);
          const byName = member ? member.name : 'Một bạn';

          currentRoom.quizState.currentIndex = msg.qIndex;
          currentRoom.quizState.playerAnswers = {}; // Reset câu trả lời của lượt thi đấu này

          // Reset trạng thái trả lời của toàn bộ thành viên về 'thinking'
          for (const m of currentRoom.members.values()) {
            m.answerStatus = 'thinking';
          }

          broadcastToRoom(currentRoom, {
            type: 'question_navigated',
            qIndex: msg.qIndex,
            userName: byName,
            members: getMemberList(currentRoom)
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
          currentRoom.quizState.playerAnswers = {};

          for (const m of currentRoom.members.values()) {
            m.answerStatus = 'thinking';
          }

          broadcastToRoom(currentRoom, {
            type: 'quiz_shuffled',
            questions: msg.questions,
            userName: byName,
            members: getMemberList(currentRoom)
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

        // --- 8. THEO DÕI HOẠT ĐỘNG THÀNH VIÊN (CHUYỂN TAB / QUAY LẠI TAB) ---
        case 'user_activity': {
          if (!currentRoom) return;
          const member = currentRoom.members.get(currentUserId);
          if (member) {
            member.activity = msg.state === 'away' ? 'away' : 'active';
            broadcastToRoom(currentRoom, {
              type: 'user_activity_changed',
              userId: currentUserId,
              userName: member.name,
              activity: member.activity,
              members: getMemberList(currentRoom)
            });
          }
          break;
        }

        // --- 9. WEBRTC VOICE CHAT (SIGNALING OFFER/ANSWER/CANDIDATE) ---
        case 'voice_signal': {
          if (!currentRoom) return;
          const targetMember = currentRoom.members.get(msg.targetUserId);
          if (targetMember && targetMember.ws && targetMember.ws.readyState === WebSocket.OPEN) {
            targetMember.ws.send(JSON.stringify({
              type: 'voice_signal',
              senderUserId: currentUserId,
              signal: msg.signal
            }));
          }
          break;
        }

        case 'voice_mute_state': {
          if (!currentRoom) return;
          const member = currentRoom.members.get(currentUserId);
          if (member) {
            member.voiceActive = !!msg.voiceActive;
            member.voiceMuted = !!msg.voiceMuted;
            broadcastToRoom(currentRoom, {
              type: 'voice_mute_changed',
              userId: currentUserId,
              userName: member.name,
              voiceActive: member.voiceActive,
              voiceMuted: member.voiceMuted,
              members: getMemberList(currentRoom)
            });
          }
          break;
        }

        // --- 10. CHỦ ĐỘNG RỜI PHÒNG (BẤM NÚT "RỜI PHÒNG") ---
        case 'leave_room': {
          if (currentRoom && currentUserId) {
            const member = currentRoom.members.get(currentUserId);
            if (member) {
              if (member.kickTimer) clearTimeout(member.kickTimer);
              const wasHost = member.isHost;
              currentRoom.members.delete(currentUserId);

              let newHost = null;
              if (wasHost && currentRoom.members.size > 0) {
                newHost = Array.from(currentRoom.members.values()).find(m => m.status === 'online') || Array.from(currentRoom.members.values())[0];
                if (newHost) newHost.isHost = true;
              }

              broadcastToRoom(currentRoom, {
                type: 'user_left',
                userId: currentUserId,
                userName: member.name,
                newHostId: newHost ? newHost.id : null,
                newHostName: newHost ? newHost.name : null,
                members: getMemberList(currentRoom),
                message: `${member.name} đã rời phòng.`
              });

              if (newHost) {
                broadcastToRoom(currentRoom, {
                  type: 'host_transferred',
                  newHostId: newHost.id,
                  newHostName: newHost.name,
                  members: getMemberList(currentRoom),
                  message: `👑 ${member.name} đã rời phòng. ${newHost.name} hiện là Host mới!`
                });
              }

              if (currentRoom.members.size === 0) {
                rooms.delete(currentRoom.id);
              }
              broadcastActiveRooms();
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

        broadcastActiveRooms();

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
