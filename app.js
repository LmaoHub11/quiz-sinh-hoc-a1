// ============================================================================
// QUIZ SINH HỌC A1 - NOTEBOOKLM STYLE + LIVE CO-OP 5 NGƯỜI
// ============================================================================

(function () {
  'use strict';

  // --- Sound Effects using Web Audio API (No external assets needed) ---
  const Sound = {
    ctx: null,
    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
    },
    playTone(freq, type, duration, delay = 0, gainLevel = 0.12) {
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + duration);
      } catch (e) {
        // audio fail silent
      }
    },
    correct() {
      this.playTone(523.25, 'sine', 0.18, 0, 0.15); // C5
      this.playTone(659.25, 'sine', 0.28, 0.1, 0.15); // E5
      this.playTone(783.99, 'sine', 0.35, 0.2, 0.12); // G5
    },
    wrong() {
      this.playTone(220, 'triangle', 0.18, 0, 0.15);
      this.playTone(180, 'sine', 0.22, 0.08, 0.15);
    },
    shuffle() {
      this.playTone(440, 'sine', 0.08, 0, 0.08);
      this.playTone(550, 'sine', 0.08, 0.05, 0.08);
      this.playTone(660, 'sine', 0.08, 0.1, 0.08);
    }
  };

  // --- Utility Functions ---
  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  // --- Confetti Animation ---
  function launchConfetti() {
    const colors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335', '#a8c7fa', '#9b72cb'];
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = 90;
    const pieces = Array.from({ length: count }, () => ({
      x: canvas.width / 2,
      y: canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10,
      tiltSpeed: Math.random() * 0.1 + 0.05
    }));

    let frame = 0;
    function anim() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.tilt += p.tiltSpeed;
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size, p.size * Math.sin(p.tilt), 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      frame++;
      if (frame < 120) {
        requestAnimationFrame(anim);
      } else {
        canvas.remove();
      }
    }
    anim();
  }

  // --- App State ---
  const State = {
    currentView: 'home', // 'home' | 'quiz' | 'result'
    activeChapterId: null,
    chapterTitle: '',
    questions: [], // Question instances with state
    currentIndex: 0,
    reviewFilter: 'wrong', // 'wrong' | 'all'
    userAnswers: {}, // index -> { selectedIndex, isCorrect, eliminated: [], selectedBy: '' }
    limitCount: 0, // 0 = all
    shuffleQ: true,
    shuffleA: false,
    theme: localStorage.getItem('sh_theme') || 'dark',

    // Live Co-op State (Phòng 5 người)
    liveMode: false,
    roomId: null,
    userName: localStorage.getItem('sh_username') || '',
    currentUser: null,
    members: [],

    // Best scores map: chapterId -> { score, total, pct }
    highScores: JSON.parse(localStorage.getItem('sh_highscores') || '{}')
  };

  const STORAGE_KEY = 'sh_current_quiz_state_v1';

  // --- Question Model Adapter ---
  function prepareQuestion(rawQ, chapterTitle, shuffleOptions) {
    let options = rawQ.o.map((text, idx) => ({
      text,
      isCorrect: idx === rawQ.a,
      origIdx: idx
    }));

    if (shuffleOptions) {
      options = shuffleArray(options);
    }

    return {
      origNumber: rawQ.n,
      chapter: chapterTitle,
      text: rawQ.q,
      options: options,
      correctOptionIdx: options.findIndex(o => o.isCorrect),
      exp: rawQ.exp || ''
    };
  }

  // --- Live Room WebSocket Controller (Phòng 5 người, 0-Latency) ---
  const LiveRoom = {
    ws: null,
    connected: false,
    unreadCount: 0,
    bannerTimer: null,

    manualLeave: false,
    reconnectTimer: null,

    getUserId() {
      let uid = localStorage.getItem('sh_user_id');
      if (!uid) {
        uid = 'u_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36).substring(4);
        localStorage.setItem('sh_user_id', uid);
      }
      return uid;
    },

    init() {
      const savedName = localStorage.getItem('sh_username');
      if (savedName) {
        const inp = document.getElementById('userNameInput');
        if (inp) inp.value = savedName;
      }

      // Tự động kết nối lại khi người dùng mở lại tab hoặc bật lại màn hình điện thoại
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && State.liveMode && !this.manualLeave) {
          this.checkAndReconnect();
        }
      });

      // Tự động kết nối lại khi có mạng trở lại
      window.addEventListener('online', () => {
        if (State.liveMode && !this.manualLeave) {
          this.checkAndReconnect();
        }
      });
    },

    checkAndReconnect() {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        console.log('[LiveRoom] Tab active trở lại, tiến hành kết nối lại...');
        this.connect(State.roomId || 'SHDC', State.userName || 'Bạn học', true);
      }
    },

    connect(roomId, userName, isReconnecting = false) {
      this.manualLeave = false;
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }

      if (this.ws) {
        try { this.ws.close(); } catch (e) {}
      }

      const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${proto}//${location.host}`;

      try {
        this.ws = new WebSocket(wsUrl);
      } catch (e) {
        showToast('Không thể kết nối WebSocket Server!');
        return;
      }

      this.ws.onopen = () => {
        this.connected = true;
        State.liveMode = true;
        State.roomId = roomId;
        State.userName = userName;
        localStorage.setItem('sh_username', userName);

        const userId = this.getUserId();

        this.send({
          type: 'join_room',
          roomId: roomId,
          userId: userId,
          userName: userName
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handleMessage(msg);
        } catch (e) {
          console.error(e);
        }
      };

      this.ws.onclose = () => {
        this.connected = false;
        if (State.liveMode && !this.manualLeave) {
          // Bị ngắt kết nối do đổi tab, khóa màn hình, tải lại trang -> Tự động thử kết nối lại
          console.log('[LiveRoom] WebSocket closed. Tự động kết nối lại sau 2s...');
          this.reconnectTimer = setTimeout(() => {
            if (State.liveMode && !this.manualLeave) {
              this.connect(State.roomId, State.userName, true);
            }
          }, 2000);
        }
      };

      this.ws.onerror = (err) => {
        console.error('WS Error:', err);
      };
    },

    send(data) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(data));
      }
    },

    handleMessage(msg) {
      switch (msg.type) {
        case 'room_joined': {
          State.roomId = msg.roomId;
          State.currentUser = msg.user;
          State.members = msg.members || [];

          this.updateRoomBar();
          this.renderMembers();
          this.renderMessages(msg.messages || []);

          if (msg.reconnected) {
            showToast(`Đã khôi phục kết nối vào phòng ${msg.roomId}! (${State.members.length}/10 bạn)`);
          } else {
            showToast(`Đã vào phòng ${msg.roomId} (${State.members.length}/10 bạn)`);
          }
          Sound.shuffle();

          // Nếu phòng đang có bài làm dở thì đồng bộ ngay
          if (msg.quizState && msg.quizState.questions && msg.quizState.questions.length > 0) {
            State.questions = msg.quizState.questions;
            State.currentIndex = msg.quizState.currentIndex || 0;
            State.userAnswers = msg.quizState.userAnswers || {};
            State.chapterTitle = msg.quizState.chapterTitle || 'Phòng Live';
            document.getElementById('quizChapter').textContent = State.chapterTitle;

            App.switchView('quiz');
            App.renderCurrentQuestion();
            App.updateDrawerGrid();
          } else if (!msg.reconnected) {
            showToast('Bạn đã vào phòng! Hãy chọn 1 chương ở dưới để cả phòng cùng làm nhé.');
          }
          break;
        }

        case 'user_status_changed': {
          State.members = msg.members || [];
          this.updateRoomBar();
          this.renderMembers();
          if (msg.message) {
            this.addSystemMessage(msg.message);
            showToast(msg.message);
          }
          break;
        }

        case 'user_kicked': {
          State.members = msg.members || [];
          this.updateRoomBar();
          this.renderMembers();
          if (msg.message) {
            this.addSystemMessage(msg.message);
            showToast(msg.message);
          }
          break;
        }

        case 'user_joined': {
          State.members = msg.members || [];
          this.updateRoomBar();
          this.renderMembers();
          showToast(msg.message);
          this.addSystemMessage(msg.message);
          Sound.shuffle();
          break;
        }

        case 'user_left': {
          State.members = msg.members || [];
          this.updateRoomBar();
          this.renderMembers();
          showToast(msg.message);
          this.addSystemMessage(msg.message);
          break;
        }

        case 'quiz_started': {
          State.questions = msg.quizState.questions;
          State.currentIndex = msg.quizState.currentIndex || 0;
          State.userAnswers = msg.quizState.userAnswers || {};
          State.chapterTitle = msg.quizState.chapterTitle;
          document.getElementById('quizChapter').textContent = State.chapterTitle;

          this.showSyncBanner(`🚀 ${msg.userName} đã chọn bài: ${State.chapterTitle}`);
          App.switchView('quiz');
          App.renderCurrentQuestion();
          App.updateDrawerGrid();
          Sound.shuffle();
          break;
        }

        case 'option_selected': {
          // BÊN KIA ĐÃ CHỌN ĐÁP ÁN -> ĐỒNG BỘ CHỌN THEO NGAY LẬP TỨC
          const letters = ['A', 'B', 'C', 'D'];
          State.userAnswers[msg.qIndex] = {
            selectedIndex: msg.optIndex,
            isCorrect: msg.isCorrect,
            selectedBy: msg.userName
          };

          this.showSyncBanner(`⚡ ${msg.userName} đã chọn đáp án ${letters[msg.optIndex]} (${msg.isCorrect ? 'ĐÚNG' : 'CHƯA ĐÚNG'})`);

          if (msg.isCorrect) Sound.correct();
          else Sound.wrong();

          App.renderCurrentQuestion();
          App.updateDrawerGrid();
          break;
        }

        case 'question_navigated': {
          State.currentIndex = msg.qIndex;
          this.showSyncBanner(`👉 ${msg.userName} đã chuyển sang câu ${msg.qIndex + 1}`);
          App.renderCurrentQuestion();
          App.updateDrawerGrid();
          break;
        }

        case 'quiz_shuffled': {
          State.questions = msg.questions;
          State.currentIndex = 0;
          State.userAnswers = {};
          this.showSyncBanner(`🔀 ${msg.userName} đã xáo trộn câu hỏi và đáp án!`);
          Sound.shuffle();
          App.renderCurrentQuestion();
          App.updateDrawerGrid();
          break;
        }

        case 'chat_broadcast': {
          this.appendMessage(msg.message);
          const drawer = document.getElementById('chatDrawer');
          if (!drawer.classList.contains('open')) {
            this.unreadCount++;
            this.updateUnreadBadges();
            Sound.playTone(800, 'sine', 0.1, 0, 0.08);
          }
          break;
        }

        case 'reaction_broadcast': {
          this.showFloatingReaction(msg.emoji, msg.userName);
          break;
        }

        case 'error': {
          alert(msg.message);
          this.exitLiveMode();
          break;
        }
      }
    },

    showSyncBanner(text) {
      const banner = document.getElementById('liveSyncBanner');
      if (!banner) return;
      banner.innerHTML = `<span class="material-symbols-rounded">sync</span> ${text}`;
      banner.classList.remove('hidden');
      clearTimeout(this.bannerTimer);
      this.bannerTimer = setTimeout(() => {
        banner.classList.add('hidden');
      }, 4000);
    },

    updateRoomBar() {
      const bar = document.getElementById('liveRoomBar');
      const floatBtn = document.getElementById('floatingChatBtn');
      if (!bar) return;

      if (State.liveMode) {
        bar.classList.remove('hidden');
        if (floatBtn) floatBtn.classList.remove('hidden');
        document.getElementById('liveRoomCode').textContent = `PHÒNG: ${State.roomId}`;
        document.getElementById('liveMembersCount').textContent = `(${State.members.length}/10 bạn)`;
        const cCount = document.getElementById('chatMembersCount');
        if (cCount) cCount.textContent = State.members.length;
      } else {
        bar.classList.add('hidden');
        if (floatBtn) floatBtn.classList.add('hidden');
      }
    },

    renderMembers() {
      const container = document.getElementById('liveMembersList');
      if (!container) return;
      container.innerHTML = '';

      const colors = ['#4285f4', '#ea4335', '#fbbc05', '#34a853', '#9b72cb', '#ff6d00', '#00b0ff', '#00c853', '#e91e63', '#795548'];

      State.members.forEach((m, idx) => {
        const isMe = State.currentUser && m.id === State.currentUser.id;
        const isOffline = m.status === 'offline';
        const color = colors[idx % colors.length];
        const initial = (m.name || '?').charAt(0).toUpperCase();

        const avt = document.createElement('div');
        avt.className = 'member-avatar' + (isMe ? ' me' : '') + (isOffline ? ' offline' : '');
        avt.style.backgroundColor = color;
        avt.title = `${m.name}${isMe ? ' (Bạn)' : ''}${isOffline ? ' [Tạm vắng - giữ chỗ 90s]' : ''}`;
        avt.innerHTML = `<span>${initial}</span><span class="online-dot ${isOffline ? 'offline' : ''}"></span>`;
        container.appendChild(avt);
      });
    },

    renderMessages(messages) {
      const box = document.getElementById('chatMessages');
      if (!box) return;
      box.innerHTML = '';
      messages.forEach(m => this.appendMessage(m));
    },

    appendMessage(m) {
      const box = document.getElementById('chatMessages');
      if (!box) return;

      const isMe = State.currentUser && m.userId === State.currentUser.id;
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${isMe ? 'mine' : 'theirs'}`;

      if (!isMe) {
        const sender = document.createElement('span');
        sender.className = 'chat-sender';
        sender.textContent = m.userName;
        bubble.appendChild(sender);
      }

      const text = document.createElement('div');
      text.className = 'chat-text';
      text.textContent = m.text;
      bubble.appendChild(text);

      const time = document.createElement('span');
      time.className = 'chat-time';
      time.textContent = m.time;
      bubble.appendChild(time);

      box.appendChild(bubble);
      box.scrollTop = box.scrollHeight;
    },

    addSystemMessage(text) {
      const box = document.getElementById('chatMessages');
      if (!box) return;
      const el = document.createElement('div');
      el.className = 'chat-sys-msg';
      el.textContent = text;
      box.appendChild(el);
      box.scrollTop = box.scrollHeight;
    },

    sendChatMessage(text) {
      if (!text.trim()) return;
      this.send({
        type: 'chat_message',
        text: text
      });
    },

    sendReaction(emoji) {
      this.send({
        type: 'send_reaction',
        emoji: emoji
      });
      this.showFloatingReaction(emoji, 'Bạn');
    },

    showFloatingReaction(emoji, userName) {
      const overlay = document.getElementById('reactionOverlay');
      if (!overlay) return;

      const item = document.createElement('div');
      item.className = 'floating-reaction';
      item.textContent = emoji;
      item.style.left = `${Math.floor(Math.random() * 60) + 20}%`;
      overlay.appendChild(item);

      setTimeout(() => item.remove(), 2500);
    },

    updateUnreadBadges() {
      const b1 = document.getElementById('unreadChatBadge');
      const b2 = document.getElementById('floatingUnreadBadge');
      [b1, b2].forEach(b => {
        if (!b) return;
        if (this.unreadCount > 0) {
          b.textContent = this.unreadCount;
          b.classList.remove('hidden');
        } else {
          b.classList.add('hidden');
        }
      });
    },

    toggleChat(open) {
      const drawer = document.getElementById('chatDrawer');
      const scrim = document.getElementById('scrim');
      if (open === undefined) open = !drawer.classList.contains('open');

      drawer.classList.toggle('open', open);
      scrim.classList.toggle('show', open);

      if (open) {
        this.unreadCount = 0;
        this.updateUnreadBadges();
        const inp = document.getElementById('chatInput');
        if (inp) setTimeout(() => inp.focus(), 150);
      }
    },

    exitLiveMode() {
      this.manualLeave = true;
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      if (this.ws) {
        this.send({ type: 'leave_room' });
        try { this.ws.close(); } catch (e) {}
        this.ws = null;
      }
      State.liveMode = false;
      State.roomId = null;
      this.updateRoomBar();
      this.toggleChat(false);
      showToast('Đã rời khỏi phòng học Live.');
    }
  };

  // --- Main Controller ---
  const App = {
    init() {
      this.applyTheme(State.theme);
      this.renderHome();
      this.bindEvents();
      this.checkResumeState();
      LiveRoom.init();
    },

    applyTheme(theme) {
      State.theme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('sh_theme', theme);
      const icon = document.querySelector('#themeBtn .material-symbols-rounded');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    },

    toggleTheme() {
      const next = State.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(next);
    },

    switchView(viewName) {
      State.currentView = viewName;
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      const target = document.getElementById(viewName + 'View');
      if (target) target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // --- Home View & Chapter selection ---
    renderHome() {
      const grid = document.getElementById('chapterGrid');
      if (!grid || !window.QUIZ_DATA) return;

      const allCount = window.QUIZ_DATA.reduce((sum, c) => sum + c.questions.length, 0);

      let html = '';

      // Card for "Tất cả các chương"
      const allBest = State.highScores['all'];
      html += `
        <button class="chapter all" data-id="all">
          <div class="ch-icon"><span class="material-symbols-rounded">stars</span></div>
          <h4>Tất cả câu hỏi (Tổng hợp)</h4>
          <div class="ch-meta">
            <span>Toàn bộ ${allCount} câu</span>
            ${allBest ? `<span class="ch-best">Điểm cao: ${allBest.score}/${allBest.total} (${allBest.pct}%)</span>` : ''}
          </div>
        </button>
      `;

      // Cards for each chapter
      window.QUIZ_DATA.forEach(ch => {
        const best = State.highScores[ch.id];
        html += `
          <button class="chapter" data-id="${ch.id}">
            <div class="ch-icon"><span class="material-symbols-rounded">science</span></div>
            <h4>${ch.title}</h4>
            <div class="ch-meta">
              <span>${ch.questions.length} câu hỏi</span>
              ${best ? `<span class="ch-best">${best.score}/${best.total} (${best.pct}%)</span>` : ''}
            </div>
          </button>
        `;
      });

      grid.innerHTML = html;
    },

    startQuiz(chapterId, customQuestions = null, customTitle = null) {
      State.activeChapterId = chapterId;
      State.userAnswers = {};
      State.currentIndex = 0;

      let rawList = [];
      let title = '';

      if (customQuestions) {
        rawList = customQuestions;
        title = customTitle || 'Luyện tập câu sai';
      } else if (chapterId === 'all') {
        title = 'Tổng hợp tất cả các chương';
        window.QUIZ_DATA.forEach(c => {
          c.questions.forEach(q => {
            rawList.push({ ...q, _chTitle: c.short });
          });
        });
      } else {
        const found = window.QUIZ_DATA.find(c => c.id === chapterId);
        if (!found) return;
        title = found.title;
        rawList = found.questions.map(q => ({ ...q, _chTitle: found.short }));
      }

      State.chapterTitle = title;

      // Shuffle question order if enabled
      let prepared = rawList.map(q => prepareQuestion(q, q._chTitle || title, State.shuffleA));
      if (State.shuffleQ) {
        prepared = shuffleArray(prepared);
      }

      // Limit question count if selected
      if (State.limitCount > 0 && State.limitCount < prepared.length) {
        prepared = prepared.slice(0, State.limitCount);
      }

      State.questions = prepared;

      // Đồng bộ tới các bạn khác trong phòng nếu đang ở chế độ Live
      if (State.liveMode) {
        LiveRoom.send({
          type: 'sync_start_quiz',
          chapterId: State.activeChapterId,
          chapterTitle: title,
          questions: prepared
        });
      }

      document.getElementById('quizChapter').textContent = title;
      this.saveSession();
      this.switchView('quiz');
      this.renderCurrentQuestion();
      this.updateDrawerGrid();
    },

    // --- Shuffle Quiz on the Fly (Nút xáo trộn trong màn hình Quiz) ---
    shuffleCurrentQuiz() {
      Sound.shuffle();
      showToast('Đã xáo trộn ngẫu nhiên toàn bộ câu hỏi và đáp án!');

      const newQuestions = shuffleArray(State.questions).map(q => {
        const reorderedOpts = shuffleArray(q.options);
        return {
          ...q,
          options: reorderedOpts,
          correctOptionIdx: reorderedOpts.findIndex(o => o.isCorrect),
          exp: q.exp || ''
        };
      });

      State.questions = newQuestions;
      State.userAnswers = {};
      State.currentIndex = 0;

      // Đồng bộ xáo trộn với phòng Live
      if (State.liveMode) {
        LiveRoom.send({
          type: 'sync_shuffle_quiz',
          questions: newQuestions
        });
      }

      this.saveSession();
      this.renderCurrentQuestion();
      this.updateDrawerGrid();
    },

    // --- Render Question Card ---
    renderCurrentQuestion() {
      const q = State.questions[State.currentIndex];
      if (!q) return;

      const qCard = document.getElementById('qCard');
      qCard.classList.remove('enter');
      void qCard.offsetWidth;
      qCard.classList.add('enter');

      // Meta
      document.getElementById('qCount').textContent = `Câu ${State.currentIndex + 1} / ${State.questions.length}`;
      document.getElementById('qOrigin').textContent = `${q.chapter} (Gốc: Câu ${q.origNumber})`;

      // Question text with HTML
      document.getElementById('qText').innerHTML = q.text;

      // Options
      const letters = ['A', 'B', 'C', 'D'];
      const optContainer = document.getElementById('options');
      optContainer.innerHTML = '';

      const answered = State.userAnswers[State.currentIndex];

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opt';
        btn.dataset.idx = idx;

        let statusIcon = '';
        let feedbackHtml = '';

        if (answered) {
          btn.disabled = true;
          const whoSelected = answered.selectedBy ? ` (${answered.selectedBy})` : '';

          if (idx === q.correctOptionIdx) {
            btn.classList.add('correct');
            statusIcon = '<span class="material-symbols-rounded opt-icon">check_circle</span>';
            feedbackHtml = `<div class="opt-feedback"><span class="material-symbols-rounded">check</span> Đáp án chính xác!${whoSelected}</div>`;
          } else if (idx === answered.selectedIndex) {
            btn.classList.add('wrong');
            btn.classList.add('shake');
            statusIcon = '<span class="material-symbols-rounded opt-icon">cancel</span>';
            feedbackHtml = `<div class="opt-feedback"><span class="material-symbols-rounded">close</span> Chưa chính xác!${whoSelected}</div>`;
          }
        } else if (answered && answered.eliminated && answered.eliminated.includes(idx)) {
          btn.classList.add('eliminated');
          btn.disabled = true;
        }

        btn.innerHTML = `
          <div class="opt-row">
            <span class="opt-letter">${letters[idx]}</span>
            <span class="opt-text">${opt.text}</span>
            ${statusIcon}
          </div>
          ${feedbackHtml}
        `;

        btn.addEventListener('click', () => this.handleOptionClick(idx));
        optContainer.appendChild(btn);
      });

      // Hint box
      const hintBox = document.getElementById('hintBox');
      const hintText = document.getElementById('hintText');
      hintBox.classList.add('hidden');
      hintText.innerHTML = '';

      // Explanation box (Lí do tại sao đúng / sai)
      const expBox = document.getElementById('expBox');
      const expBadge = document.getElementById('expBadge');
      const expContent = document.getElementById('expContent');

      if (answered && q.exp) {
        expBox.classList.remove('hidden');
        expBox.classList.remove('correct-theme', 'wrong-theme');
        if (answered.isCorrect) {
          expBox.classList.add('correct-theme');
          expBadge.className = 'exp-badge good';
          expBadge.innerHTML = '<span class="material-symbols-rounded" style="font-size:16px;margin-right:4px;">check</span> Lí do đáp án ĐÚNG';
        } else {
          expBox.classList.add('wrong-theme');
          expBadge.className = 'exp-badge bad';
          expBadge.innerHTML = `<span class="material-symbols-rounded" style="font-size:16px;margin-right:4px;">close</span> Đáp án đúng là <b>${letters[q.correctOptionIdx]}</b> — Giải thích chi tiết`;
        }
        expContent.innerHTML = q.exp;
      } else {
        expBox.classList.add('hidden');
        expContent.innerHTML = '';
      }

      // Update counters & progress
      this.updateScorePills();
      this.updateProgressBar();

      // Navigation buttons
      document.getElementById('prevBtn').disabled = State.currentIndex === 0;
      const nextBtn = document.getElementById('nextBtn');
      if (State.currentIndex === State.questions.length - 1) {
        nextBtn.innerHTML = 'Nộp bài <span class="material-symbols-rounded">flag</span>';
      } else {
        nextBtn.innerHTML = 'Tiếp <span class="material-symbols-rounded">arrow_forward</span>';
      }

      this.updateDrawerGrid();
    },

    handleOptionClick(optIndex) {
      if (State.userAnswers[State.currentIndex]) return; // already answered

      const q = State.questions[State.currentIndex];
      const isCorrect = optIndex === q.correctOptionIdx;

      State.userAnswers[State.currentIndex] = {
        selectedIndex: optIndex,
        isCorrect: isCorrect,
        selectedBy: State.userName || 'Bạn'
      };

      if (isCorrect) {
        Sound.correct();
      } else {
        Sound.wrong();
      }

      // ĐỒNG BỘ SANG CÁC BẠN KHÁC TRONG PHÒNG
      if (State.liveMode) {
        LiveRoom.send({
          type: 'sync_select_option',
          qIndex: State.currentIndex,
          optIndex: optIndex,
          isCorrect: isCorrect
        });
      }

      this.saveSession();
      this.renderCurrentQuestion();
    },

    // --- Hint (50:50) ---
    useHint() {
      const q = State.questions[State.currentIndex];
      if (State.userAnswers[State.currentIndex]) {
        showToast('Bạn đã trả lời câu này rồi.');
        return;
      }

      const wrongIndices = q.options
        .map((_, i) => i)
        .filter(i => i !== q.correctOptionIdx);

      const shuffledWrong = shuffleArray(wrongIndices).slice(0, 2);

      const optButtons = document.querySelectorAll('#options .opt');
      shuffledWrong.forEach(i => {
        if (optButtons[i]) {
          optButtons[i].classList.add('eliminated');
          optButtons[i].disabled = true;
        }
      });

      const hintBox = document.getElementById('hintBox');
      const hintText = document.getElementById('hintText');
      hintBox.classList.remove('hidden');
      hintText.textContent = `Gợi ý: Đã loại bỏ 2 phương án sai (${shuffledWrong.map(i => ['A','B','C','D'][i]).join(', ')}).`;
      Sound.shuffle();
    },

    updateScorePills() {
      let good = 0;
      let bad = 0;
      Object.values(State.userAnswers).forEach(ans => {
        if (ans.isCorrect) good++;
        else bad++;
      });
      document.getElementById('scoreGood').textContent = good;
      document.getElementById('scoreBad').textContent = bad;
    },

    updateProgressBar() {
      const total = State.questions.length;
      const answeredCount = Object.keys(State.userAnswers).length;
      const pct = total > 0 ? (answeredCount / total) * 100 : 0;
      document.getElementById('progressBar').style.width = pct + '%';
    },

    updateDrawerGrid() {
      const grid = document.getElementById('navGrid');
      if (!grid) return;
      grid.innerHTML = '';

      State.questions.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.textContent = i + 1;
        if (i === State.currentIndex) btn.classList.add('current');

        const ans = State.userAnswers[i];
        if (ans) {
          if (ans.isCorrect) btn.classList.add('good');
          else btn.classList.add('bad');
        }

        btn.addEventListener('click', () => {
          State.currentIndex = i;
          if (State.liveMode) {
            LiveRoom.send({
              type: 'sync_nav_question',
              qIndex: State.currentIndex
            });
          }
          this.renderCurrentQuestion();
          this.toggleDrawer(false);
        });
        grid.appendChild(btn);
      });
    },

    toggleDrawer(open) {
      const d = document.getElementById('drawer');
      const s = document.getElementById('scrim');
      if (open === undefined) {
        open = !d.classList.contains('open');
      }
      d.classList.toggle('open', open);
      s.classList.toggle('show', open);
    },

    nextQuestion() {
      if (State.currentIndex < State.questions.length - 1) {
        State.currentIndex++;
        if (State.liveMode) {
          LiveRoom.send({
            type: 'sync_nav_question',
            qIndex: State.currentIndex
          });
        }
        this.renderCurrentQuestion();
      } else {
        this.finishQuiz();
      }
    },

    prevQuestion() {
      if (State.currentIndex > 0) {
        State.currentIndex--;
        if (State.liveMode) {
          LiveRoom.send({
            type: 'sync_nav_question',
            qIndex: State.currentIndex
          });
        }
        this.renderCurrentQuestion();
      }
    },

    // --- Finish & Result View ---
    finishQuiz() {
      this.toggleDrawer(false);
      this.clearSession();

      const total = State.questions.length;
      let good = 0;
      let bad = 0;
      let skip = 0;

      State.questions.forEach((_, i) => {
        const ans = State.userAnswers[i];
        if (!ans) skip++;
        else if (ans.isCorrect) good++;
        else bad++;
      });

      const pct = Math.round((good / total) * 100);

      // Save high score
      if (State.activeChapterId) {
        const prev = State.highScores[State.activeChapterId];
        if (!prev || pct > prev.pct) {
          State.highScores[State.activeChapterId] = { score: good, total, pct };
          localStorage.setItem('sh_highscores', JSON.stringify(State.highScores));
          this.renderHome();
        }
      }

      // Display result
      document.getElementById('resPercent').textContent = pct + '%';
      document.getElementById('resGood').textContent = good;
      document.getElementById('resBad').textContent = bad;
      document.getElementById('resSkip').textContent = skip;

      let title = 'Rất xuất sắc!';
      let sub = 'Cả nhóm đã nắm rất vững kiến thức phần này.';
      if (pct < 50) {
        title = 'Cần ôn tập thêm!';
        sub = 'Hãy xem lại các câu sai bên dưới và thảo luận cùng nhau nhé.';
      } else if (pct < 80) {
        title = 'Kết quả khá tốt!';
        sub = 'Tiếp tục luyện tập cùng nhau để đạt điểm tuyệt đối nhé.';
      }

      document.getElementById('resTitle').textContent = title;
      document.getElementById('resSub').textContent = sub;

      const circumference = 326.7;
      const offset = circumference - (pct / 100) * circumference;
      const ringFg = document.getElementById('ringFg');
      ringFg.style.strokeDashoffset = circumference;
      setTimeout(() => {
        ringFg.style.strokeDashoffset = offset;
      }, 100);

      if (pct >= 80) {
        launchConfetti();
      }

      this.renderReviewList();
      this.switchView('result');
    },

    renderReviewList() {
      const container = document.getElementById('reviewList');
      if (!container) return;
      container.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      const showAll = State.reviewFilter === 'all';

      let itemsCount = 0;

      State.questions.forEach((q, i) => {
        const ans = State.userAnswers[i];
        const isWrong = !ans || !ans.isCorrect;

        if (!showAll && !isWrong) return;

        itemsCount++;
        const item = document.createElement('div');
        item.className = 'rv-item';

        const correctOpt = q.options[q.correctOptionIdx];
        const userOpt = ans ? q.options[ans.selectedIndex] : null;

        let statusLine = '';
        if (!ans) {
          statusLine = `
            <div class="rv-line skip">
              <span class="material-symbols-rounded">help</span>
              <span>Chưa trả lời</span>
            </div>
          `;
        } else if (!ans.isCorrect) {
          const by = ans.selectedBy ? ` (${ans.selectedBy} chọn)` : '';
          statusLine = `
            <div class="rv-line no">
              <span class="material-symbols-rounded">close</span>
              <span>Nhóm chọn: <b>${letters[ans.selectedIndex]}.</b> ${userOpt ? userOpt.text : ''}${by}</span>
            </div>
          `;
        }

        const correctLine = `
          <div class="rv-line ok">
            <span class="material-symbols-rounded">check</span>
            <span>Đáp án đúng: <b>${letters[q.correctOptionIdx]}.</b> ${correctOpt.text}</span>
          </div>
        `;

        const expLine = q.exp ? `
          <div class="rv-exp">
            <span class="material-symbols-rounded">school</span>
            <div>
              <strong>Lý do & Giải thích:</strong> ${q.exp}
            </div>
          </div>
        ` : '';

        item.innerHTML = `
          <div class="rv-q">
            <span class="rv-num">#${i + 1}</span>
            <span>${q.text}</span>
          </div>
          ${statusLine}
          ${correctLine}
          ${expLine}
        `;
        container.appendChild(item);
      });

      if (itemsCount === 0) {
        container.innerHTML = `<div class="rv-empty">Chúc mừng! Bạn không có câu sai nào trong danh sách.</div>`;
      }
    },

    retryWrongQuestions() {
      const wrongList = [];
      State.questions.forEach((q, i) => {
        const ans = State.userAnswers[i];
        if (!ans || !ans.isCorrect) {
          wrongList.push({
            n: q.origNumber,
            q: q.text,
            o: q.options.map(o => o.text),
            a: q.correctOptionIdx,
            exp: q.exp,
            _chTitle: q.chapter
          });
        }
      });

      if (wrongList.length === 0) {
        showToast('Bạn không có câu sai nào để làm lại!');
        return;
      }

      this.startQuiz(State.activeChapterId, wrongList, `Làm lại ${wrongList.length} câu sai`);
    },

    saveSession() {
      if (State.liveMode) return; // In live mode, server holds state
      if (State.questions.length === 0) return;
      const payload = {
        activeChapterId: State.activeChapterId,
        chapterTitle: State.chapterTitle,
        questions: State.questions,
        currentIndex: State.currentIndex,
        userAnswers: State.userAnswers,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },

    clearSession() {
      localStorage.removeItem(STORAGE_KEY);
      this.checkResumeState();
    },

    checkResumeState() {
      const raw = localStorage.getItem(STORAGE_KEY);
      const card = document.getElementById('resumeCard');
      const info = document.getElementById('resumeInfo');
      if (!card || !info) return;

      if (!raw || State.liveMode) {
        card.classList.add('hidden');
        return;
      }

      try {
        const data = JSON.parse(raw);
        const answeredCount = Object.keys(data.userAnswers || {}).length;
        info.textContent = `${data.chapterTitle} • Đã làm ${answeredCount}/${data.questions.length} câu`;
        card.classList.remove('hidden');
      } catch (e) {
        card.classList.add('hidden');
      }
    },

    resumeSession() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        const data = JSON.parse(raw);
        State.activeChapterId = data.activeChapterId;
        State.chapterTitle = data.chapterTitle;
        State.questions = data.questions;
        State.currentIndex = data.currentIndex || 0;
        State.userAnswers = data.userAnswers || {};

        document.getElementById('quizChapter').textContent = State.chapterTitle;
        this.switchView('quiz');
        this.renderCurrentQuestion();
        this.updateDrawerGrid();
        showToast('Đã khôi phục bài làm dở của bạn!');
      } catch (e) {
        this.clearSession();
      }
    },

    // --- Event Bindings ---
    bindEvents() {
      // Theme toggle
      document.getElementById('themeBtn').addEventListener('click', () => this.toggleTheme());

      // Brand / Home click
      document.getElementById('homeBtn').addEventListener('click', () => {
        if (State.currentView === 'quiz') {
          if (confirm('Bạn có muốn tạm dừng bài kiểm tra và quay về trang chủ?')) {
            this.saveSession();
            this.checkResumeState();
            this.switchView('home');
          }
        } else {
          this.switchView('home');
        }
      });

      // Chapter grid delegation
      document.getElementById('chapterGrid').addEventListener('click', (e) => {
        const btn = e.target.closest('.chapter');
        if (!btn) return;
        const id = btn.dataset.id;
        this.startQuiz(id);
      });

      // Settings toggles
      const qShuffleEl = document.getElementById('optShuffleQ');
      qShuffleEl.addEventListener('change', (e) => {
        State.shuffleQ = e.target.checked;
      });

      const aShuffleEl = document.getElementById('optShuffleA');
      aShuffleEl.addEventListener('change', (e) => {
        State.shuffleA = e.target.checked;
      });

      // Limit question segmented buttons
      const countGroup = document.getElementById('optCount');
      countGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        countGroup.querySelectorAll('button').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        State.limitCount = parseInt(btn.dataset.v, 10) || 0;
      });

      // Resume actions
      document.getElementById('resumeBtn').addEventListener('click', () => this.resumeSession());
      document.getElementById('discardBtn').addEventListener('click', () => this.clearSession());

      // Quiz Navigation
      document.getElementById('prevBtn').addEventListener('click', () => this.prevQuestion());
      document.getElementById('nextBtn').addEventListener('click', () => this.nextQuestion());
      document.getElementById('hintBtn').addEventListener('click', () => this.useHint());

      // Toolbar buttons
      document.getElementById('shuffleBtn').addEventListener('click', () => this.shuffleCurrentQuiz());
      document.getElementById('gridBtn').addEventListener('click', () => this.toggleDrawer(true));
      document.getElementById('closeDrawer').addEventListener('click', () => this.toggleDrawer(false));
      document.getElementById('scrim').addEventListener('click', () => {
        this.toggleDrawer(false);
        LiveRoom.toggleChat(false);
      });
      document.getElementById('finishBtn').addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn nộp bài kiểm tra ngay bây giờ?')) {
          this.finishQuiz();
        }
      });

      // Result View actions
      document.getElementById('reviewWrongBtn').addEventListener('click', () => this.retryWrongQuestions());
      document.getElementById('retryBtn').addEventListener('click', () => {
        this.shuffleCurrentQuiz();
        this.switchView('quiz');
      });
      document.getElementById('backHomeBtn').addEventListener('click', () => {
        this.checkResumeState();
        this.switchView('home');
      });

      // Review filter toggle
      const reviewFilter = document.getElementById('reviewFilter');
      reviewFilter.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        reviewFilter.querySelectorAll('button').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        State.reviewFilter = btn.dataset.f;
        this.renderReviewList();
      });

      // Live Room Events
      document.getElementById('joinRoomBtn').addEventListener('click', () => {
        const nameInput = document.getElementById('userNameInput');
        const roomInput = document.getElementById('roomIdInput');
        const name = (nameInput.value || '').trim() || 'Bạn ' + Math.floor(Math.random() * 90 + 10);
        const room = (roomInput.value || '').trim() || 'SHDC';
        nameInput.value = name;
        LiveRoom.connect(room, name);
      });

      const shareBtn = document.getElementById('shareRoomBtn');
      if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
          let urlToShare = window.location.href;
          try {
            const res = await fetch('/api/tunnel-url');
            const data = await res.json();
            if (data && data.url) {
              urlToShare = data.url;
            }
          } catch (e) {}

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(urlToShare).then(() => {
              showToast('Đã sao chép link web! Gửi link này cho bạn bè nhé.');
            }).catch(() => {
              prompt('Sao chép link dưới đây để gửi cho bạn bè:', urlToShare);
            });
          } else {
            prompt('Sao chép link dưới đây để gửi cho bạn bè:', urlToShare);
          }
        });
      }

      document.getElementById('leaveRoomBtn').addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn rời khỏi phòng học Live?')) {
          LiveRoom.exitLiveMode();
        }
      });

      document.getElementById('openChatBtn').addEventListener('click', () => LiveRoom.toggleChat(true));
      document.getElementById('floatingChatBtn').addEventListener('click', () => LiveRoom.toggleChat(true));
      document.getElementById('closeChatBtn').addEventListener('click', () => LiveRoom.toggleChat(false));

      document.getElementById('chatForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const inp = document.getElementById('chatInput');
        const text = inp.value.trim();
        if (text) {
          LiveRoom.sendChatMessage(text);
          inp.value = '';
        }
      });

      // Reactions click delegation
      document.querySelector('.chat-reactions').addEventListener('click', (e) => {
        const btn = e.target.closest('.reaction-btn');
        if (btn && btn.dataset.e) {
          LiveRoom.sendReaction(btn.dataset.e);
        }
      });

      // Keyboard navigation
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (State.currentView === 'quiz') {
          const key = e.key.toUpperCase();
          if (['A', 'B', 'C', 'D'].includes(key)) {
            const idx = ['A', 'B', 'C', 'D'].indexOf(key);
            this.handleOptionClick(idx);
          } else if (['1', '2', '3', '4'].includes(key)) {
            const idx = parseInt(key, 10) - 1;
            this.handleOptionClick(idx);
          } else if (e.key === 'ArrowRight') {
            this.nextQuestion();
          } else if (e.key === 'ArrowLeft') {
            this.prevQuestion();
          } else if (key === 'H') {
            this.useHint();
          } else if (e.key === 'Escape') {
            this.toggleDrawer(false);
            LiveRoom.toggleChat(false);
          }
        }
      });
    }
  };

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
