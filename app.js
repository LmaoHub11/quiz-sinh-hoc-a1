// ============================================================================
// QUIZ SINH HỌC A1 - NOTEBOOKLM STYLE + LIVE CO-OP 5 NGƯỜI
// ============================================================================

(function () {
  'use strict';

  // --- Sound Effects using Web Audio API (No external assets needed) ---
  // --- Sound Effects using Web Audio API (No external assets needed) ---
  const Sound = {
    ctx: null,
    muted: localStorage.getItem('sh_sound_muted') === 'true',
    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
    },
    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('sh_sound_muted', this.muted);
      this.updateIcons();
      showToast(this.muted ? '🔇 Đã tắt âm thanh' : '🔊 Đã bật âm thanh');
    },
    updateIcons() {
      const iconName = this.muted ? 'volume_off' : 'volume_up';
      const topIcon = document.getElementById('soundIcon');
      const quizIcon = document.getElementById('quizSoundIcon');
      const sideIcon = document.getElementById('sidebarSoundIcon');
      const sideText = document.getElementById('sidebarSoundText');
      if (topIcon) topIcon.textContent = iconName;
      if (quizIcon) quizIcon.textContent = iconName;
      if (sideIcon) sideIcon.textContent = iconName;
      if (sideText) sideText.textContent = this.muted ? 'Âm thanh: Đã tắt' : 'Âm thanh: Đang bật';
    },
    playTone(freq, type, duration, delay = 0, gainLevel = 0.12) {
      if (this.muted) return;
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
    },
    tick() {
      this.playTone(880, 'sine', 0.05, 0, 0.06);
    },
    tickUrgent() {
      this.playTone(1100, 'triangle', 0.09, 0, 0.14);
      this.playTone(880, 'sine', 0.06, 0.04, 0.1);
    },
    streak() {
      this.playTone(523.25, 'sine', 0.1, 0, 0.15);
      this.playTone(659.25, 'sine', 0.1, 0.08, 0.15);
      this.playTone(783.99, 'sine', 0.12, 0.16, 0.15);
      this.playTone(1046.5, 'sine', 0.25, 0.24, 0.18);
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
    currentView: 'welcome', // 'welcome' | 'subjects' | 'liveLobby' | 'quiz' | 'result'
    currentSubjectId: null, // Ban đầu khi mở trang web thì user chưa chọn môn nào
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

    // Live Co-op & Versus State (Phòng 10 người)
    liveMode: false,
    liveModeType: 'coop', // 'coop' | 'versus'
    liveTimerSeconds: 30, // 15, 30, 45 giây mỗi câu
    roomId: null,
    userName: localStorage.getItem('sh_username') || '',
    currentUser: null,
    members: [],
    roundLeaderboard: [],

    // Best scores map: key -> { score, total, pct }
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

  // --- Question Countdown Timer (30s / câu, khẩn cấp 5s cuối) ---
  const QuestionTimer = {
    totalSeconds: 30,
    timeLeft: 30,
    interval: null,
    active: false,

    start(seconds = 30) {
      this.stop();
      this.totalSeconds = seconds || 30;
      this.timeLeft = this.totalSeconds;
      this.active = true;

      const wrap = document.getElementById('questionTimerWrap');
      if (wrap) {
        wrap.classList.remove('hidden', 'urgent');
      }
      this.updateUI();

      this.interval = setInterval(() => {
        this.timeLeft--;
        this.updateUI();

        if (this.timeLeft <= 5 && this.timeLeft > 0) {
          Sound.tickUrgent();
        }

        if (this.timeLeft <= 0) {
          this.stop();
          this.onExpire();
        }
      }, 1000);
    },

    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.active = false;
    },

    hide() {
      this.stop();
      const wrap = document.getElementById('questionTimerWrap');
      if (wrap) wrap.classList.add('hidden');
    },

    updateUI() {
      const countdownEl = document.getElementById('timerCountdown');
      const barEl = document.getElementById('questionTimerBar');
      const wrap = document.getElementById('questionTimerWrap');

      if (countdownEl) countdownEl.textContent = `${Math.max(0, this.timeLeft)}s`;
      if (barEl) {
        const pct = Math.max(0, (this.timeLeft / this.totalSeconds) * 100);
        barEl.style.width = pct + '%';
      }
      if (wrap) {
        if (this.timeLeft <= 5 && this.timeLeft > 0) {
          wrap.classList.add('urgent');
        } else {
          wrap.classList.remove('urgent');
        }
      }
    },

    onExpire() {
      if (State.liveMode && State.liveModeType === 'versus') {
        if (!State.userAnswers[State.currentIndex]) {
          App.handleOptionClick(-1);
        }
      }
    }
  };

  // --- WebRTC Voice Chat Manager (P2P Mesh - Perfect Negotiation & Mobile Audio Fix) ---
  const VoiceChat = {
    localStream: null,
    audioCtx: null,
    peers: new Map(), // userId -> peerData { pc, targetUserId, makingOffer, ignoreOffer, isPolite, candidatesQueue, hasRemoteDescription }
    audioElements: new Map(), // userId -> HTMLAudioElement
    joined: false,
    muted: false,

    init() {
      // Mở khóa hệ thống AudioContext & HTMLAudioElement trên Mobile khi người dùng chạm bất kỳ đâu
      const unlockAudio = () => {
        try {
          if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
              this.audioCtx = new AudioContextClass();
            }
          }
          if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
          }
        } catch (e) {}

        this.resumeAllAudio();
      };

      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('touchend', unlockAudio, { passive: true });
    },

    resumeAllAudio() {
      this.audioElements.forEach((audio) => {
        if (audio && audio.srcObject) {
          audio.volume = 1.0;
          audio.muted = false;
          if (audio.paused) {
            audio.play().catch(() => {});
          }
        }
      });
      this.hideAudioUnlockBanner();
    },

    showAudioUnlockBanner() {
      let banner = document.getElementById('audioUnlockBanner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'audioUnlockBanner';
        banner.className = 'audio-unlock-toast';
        banner.innerHTML = `
          <span class="material-symbols-rounded">volume_up</span>
          <span>Chạm vào đây để bật loa nghe bạn bè nói</span>
        `;
        banner.addEventListener('click', () => this.resumeAllAudio());
        document.body.appendChild(banner);
      }
      banner.classList.remove('hidden');
    },

    hideAudioUnlockBanner() {
      const banner = document.getElementById('audioUnlockBanner');
      if (banner) banner.classList.add('hidden');
    },

    async toggleMic() {
      if (!this.joined) {
        await this.joinVoice();
      } else {
        this.setMute(!this.muted);
      }
    },

    async joinVoice() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast('Trình duyệt không hỗ trợ truy cập Microphone WebRTC!');
        return;
      }

      this.resumeAllAudio();

      try {
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            },
            video: false
          });
        } catch (err) {
          console.warn('[WebRTC] Thử lại getUserMedia với audio: true cơ bản...', err);
          stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        }

        this.localStream = stream;
        this.joined = true;
        this.muted = false;

        this.updateBtnUI();
        showToast('🎙️ Đã kết nối Micro! Bạn có thể nói chuyện trực tiếp với bạn bè.');

        LiveRoom.send({
          type: 'voice_mute_state',
          voiceActive: true,
          voiceMuted: false
        });

        // 1. Gắn audio track vào tất cả các peer connection đã tạo
        this.peers.forEach((peerData) => {
          this.attachLocalTracksToPc(peerData.pc);
        });

        // 2. Khởi tạo kết nối tới các thành viên online khác chưa có peer
        State.members.forEach(m => {
          if (m.id !== State.currentUser?.id && m.status === 'online') {
            this.getOrCreatePeer(m.id);
          }
        });
      } catch (err) {
        console.error('[Voice Error]', err);
        showToast('Không thể bật Mic: Vui lòng cho phép quyền Microphone trong trình duyệt!');
      }
    },

    attachLocalTracksToPc(pc) {
      if (!this.localStream) return;
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (!audioTrack) return;

      const transceivers = pc.getTransceivers ? pc.getTransceivers() : [];
      const audioTransceiver = transceivers.find(t => t.receiver && t.receiver.track && t.receiver.track.kind === 'audio')
        || transceivers.find(t => t.sender && t.sender.track && t.sender.track.kind === 'audio');

      if (audioTransceiver) {
        audioTransceiver.direction = 'sendrecv';
        if (audioTransceiver.sender) {
          audioTransceiver.sender.replaceTrack(audioTrack);
        }
      } else {
        const senders = pc.getSenders ? pc.getSenders() : [];
        const existingSender = senders.find(s => s.track && s.track.kind === 'audio');
        if (existingSender) {
          existingSender.replaceTrack(audioTrack);
        } else {
          pc.addTrack(audioTrack, this.localStream);
        }
      }
    },

    setMute(muted) {
      if (!this.joined || !this.localStream) return;
      this.muted = muted;
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = !muted;
      });
      this.updateBtnUI();
      showToast(muted ? '🔇 Đã tắt Micro' : '🎙️ Đã bật Micro');

      LiveRoom.send({
        type: 'voice_mute_state',
        voiceActive: true,
        voiceMuted: muted
      });
    },

    leaveVoice() {
      if (this.localStream) {
        this.localStream.getTracks().forEach(t => t.stop());
        this.localStream = null;
      }
      this.peers.forEach(peerData => {
        try { peerData.pc.close(); } catch (e) {}
      });
      this.peers.clear();
      this.audioElements.forEach(el => {
        try {
          el.pause();
          el.srcObject = null;
          el.remove();
        } catch (e) {}
      });
      this.audioElements.clear();
      this.joined = false;
      this.muted = false;
      this.updateBtnUI();
      this.hideAudioUnlockBanner();

      LiveRoom.send({
        type: 'voice_mute_state',
        voiceActive: false,
        voiceMuted: false
      });
    },

    removePeer(targetUserId) {
      const peerData = this.peers.get(targetUserId);
      if (peerData) {
        try { peerData.pc.close(); } catch (e) {}
        this.peers.delete(targetUserId);
      }
      const audio = this.audioElements.get(targetUserId);
      if (audio) {
        try {
          audio.pause();
          audio.srcObject = null;
          audio.remove();
        } catch (e) {}
        this.audioElements.delete(targetUserId);
      }
    },

    updateBtnUI() {
      const btn = document.getElementById('voiceMicBtn');
      const icon = document.getElementById('voiceMicIcon');
      const label = document.getElementById('voiceMicLabel');
      if (!btn) return;

      if (!this.joined) {
        btn.className = 'btn outline sm voice-btn';
        if (icon) icon.textContent = 'mic_off';
        if (label) label.textContent = 'Bật Mic';
      } else if (this.muted) {
        btn.className = 'btn outline sm voice-btn muted';
        if (icon) icon.textContent = 'mic_off';
        if (label) label.textContent = 'Đang tắt mic';
      } else {
        btn.className = 'btn outline sm voice-btn active';
        if (icon) icon.textContent = 'mic';
        if (label) label.textContent = 'Đang nói';
      }
    },

    getOrCreatePeer(targetUserId) {
      if (this.peers.has(targetUserId)) {
        return this.peers.get(targetUserId);
      }

      console.log(`[WebRTC] Tạo kết nối đàm thoại P2P với ${targetUserId}`);

      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun.cloudflare.com:3478' }
        ]
      });

      const myId = State.currentUser?.id || '';
      // Deterministic polite peer (giải quyết 100% hiện tượng xung đột offer glare)
      const isPolite = myId > targetUserId;

      const peerData = {
        pc,
        targetUserId,
        makingOffer: false,
        ignoreOffer: false,
        isPolite,
        candidatesQueue: [],
        hasRemoteDescription: false
      };

      this.peers.set(targetUserId, peerData);

      // Cấu hình transceiver audio: nếu có mic thì gửi, chưa bật mic thì sẵn sàng nhận (recvonly)
      try {
        if (this.localStream) {
          this.attachLocalTracksToPc(pc);
        } else if (pc.addTransceiver) {
          pc.addTransceiver('audio', { direction: 'recvonly' });
        }
      } catch (e) {
        console.warn('[WebRTC Transceiver init]', e);
      }

      // 1. Tự động đàm phán lại khi có track mới (Perfect Negotiation)
      pc.onnegotiationneeded = async () => {
        try {
          peerData.makingOffer = true;
          const offer = await pc.createOffer();
          if (pc.signalingState !== 'stable') return;
          await pc.setLocalDescription(offer);
          LiveRoom.send({
            type: 'voice_signal',
            targetUserId: targetUserId,
            signal: { sdp: pc.localDescription }
          });
        } catch (err) {
          console.error(`[WebRTC Negotiation Error ${targetUserId}]`, err);
        } finally {
          peerData.makingOffer = false;
        }
      };

      // 2. Trao đổi ICE candidate
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          LiveRoom.send({
            type: 'voice_signal',
            targetUserId: targetUserId,
            signal: { candidate: event.candidate }
          });
        }
      };

      // 3. Nhận audio track từ bạn học (Khắc phục triệt để lỗi Mobile không phát tiếng)
      pc.ontrack = (event) => {
        console.log(`[WebRTC] Đã nhận luồng âm thanh từ ${targetUserId}`);
        let audio = this.audioElements.get(targetUserId);
        if (!audio) {
          audio = document.createElement('audio');
          audio.id = `remote_audio_${targetUserId}`;
          audio.autoplay = true;
          audio.playsInline = true;
          audio.setAttribute('playsinline', '');
          audio.setAttribute('webkit-playsinline', '');
          audio.muted = false;
          audio.volume = 1.0;

          let container = document.getElementById('webrtcAudioContainer');
          if (!container) {
            container = document.createElement('div');
            container.id = 'webrtcAudioContainer';
            container.style.position = 'fixed';
            container.style.bottom = '0';
            container.style.left = '0';
            container.style.width = '0';
            container.style.height = '0';
            container.style.overflow = 'hidden';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '-1';
            document.body.appendChild(container);
          }
          container.appendChild(audio);
          this.audioElements.set(targetUserId, audio);
        }

        const stream = (event.streams && event.streams[0]) ? event.streams[0] : new MediaStream([event.track]);
        audio.srcObject = stream;
        audio.volume = 1.0;
        audio.muted = false;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log(`[WebRTC] Loa đang phát giọng nói từ ${targetUserId}`);
            this.hideAudioUnlockBanner();
          }).catch((err) => {
            console.warn(`[WebRTC Autoplay Policy] Trình duyệt điện thoại cần chạm màn hình để phát âm thanh:`, err);
            this.showAudioUnlockBanner();
          });
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log(`[WebRTC ICE ${targetUserId}] Trạng thái kết nối: ${pc.iceConnectionState}`);
        if (pc.iceConnectionState === 'failed') {
          if (peerData.isPolite && pc.restartIce) {
            try { pc.restartIce(); } catch (e) {}
          }
        }
      };

      return peerData;
    },

    async handleSignal(senderUserId, signal) {
      const peerData = this.getOrCreatePeer(senderUserId);
      const { pc } = peerData;

      try {
        if (signal.sdp) {
          const description = new RTCSessionDescription(signal.sdp);
          const readyForOffer = !peerData.makingOffer && (pc.signalingState === 'stable' || pc.signalingState === 'have-remote-offer');
          const offerCollision = description.type === 'offer' && !readyForOffer;

          peerData.ignoreOffer = !peerData.isPolite && offerCollision;
          if (peerData.ignoreOffer) {
            console.warn(`[WebRTC] Glare: Bên impolite bỏ qua offer từ ${senderUserId}`);
            return;
          }

          if (offerCollision && peerData.isPolite) {
            console.warn(`[WebRTC] Glare: Bên polite rollback để chấp nhận offer từ ${senderUserId}`);
            await pc.setLocalDescription({ type: 'rollback' });
          }

          await pc.setRemoteDescription(description);
          peerData.hasRemoteDescription = true;

          // Giải phóng các ICE candidate đã nhận trước khi có Remote Description
          while (peerData.candidatesQueue.length > 0) {
            const c = peerData.candidatesQueue.shift();
            try {
              await pc.addIceCandidate(c);
            } catch (e) {
              console.warn('[WebRTC Candidate Error]', e);
            }
          }

          if (description.type === 'offer') {
            if (this.localStream) {
              this.attachLocalTracksToPc(pc);
            }
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            LiveRoom.send({
              type: 'voice_signal',
              targetUserId: senderUserId,
              signal: { sdp: pc.localDescription }
            });
          }
        } else if (signal.candidate) {
          const candidate = new RTCIceCandidate(signal.candidate);
          if (peerData.hasRemoteDescription && pc.remoteDescription) {
            await pc.addIceCandidate(candidate);
          } else {
            peerData.candidatesQueue.push(candidate);
          }
        }
      } catch (err) {
        console.error(`[WebRTC Signal Error ${senderUserId}]`, err);
      }
    }
  };

  // --- Khung Chat Nổi & Xem Trước Tin Nhắn (Floating Chat) ---
  const FloatingChat = {
    unreadCount: 0,
    previewTimer: null,
    isOpen: false,
    isMinimized: false,

    init() {
      const floatBtn = document.getElementById('floatingChatBtn');
      const openBtn = document.getElementById('openChatBtn');
      if (floatBtn) floatBtn.addEventListener('click', () => this.toggleWindow());
      if (openBtn) openBtn.addEventListener('click', () => this.toggleWindow());

      const closeBtn = document.getElementById('closeFloatingChatBtn');
      const minBtn = document.getElementById('minimizeChatBtn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeWindow());
      if (minBtn) minBtn.addEventListener('click', () => this.toggleMinimize());

      const closePrevBtn = document.getElementById('closeChatPreviewBtn');
      const prevToast = document.getElementById('chatFloatingPreview');
      if (closePrevBtn) {
        closePrevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.hidePreview();
        });
      }
      if (prevToast) {
        prevToast.addEventListener('click', () => {
          this.hidePreview();
          this.openWindow();
        });
      }

      const form = document.getElementById('chatForm');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const inp = document.getElementById('chatInput');
          if (inp && inp.value.trim()) {
            LiveRoom.sendChatMessage(inp.value.trim());
            inp.value = '';
          }
        });
      }

      document.querySelectorAll('.chat-reactions .reaction-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const emoji = btn.dataset.e || '👍';
          LiveRoom.sendReaction(emoji);
        });
      });
    },

    openWindow() {
      const win = document.getElementById('floatingChatWindow');
      if (!win) return;
      this.isOpen = true;
      this.isMinimized = false;
      win.classList.remove('hidden', 'minimized');
      this.unreadCount = 0;
      this.updateBadges();
      const inp = document.getElementById('chatInput');
      if (inp) setTimeout(() => inp.focus(), 150);
    },

    closeWindow() {
      const win = document.getElementById('floatingChatWindow');
      if (!win) return;
      this.isOpen = false;
      win.classList.add('hidden');
    },

    toggleWindow() {
      if (this.isOpen && !this.isMinimized) {
        this.closeWindow();
      } else {
        this.openWindow();
      }
    },

    toggleMinimize() {
      const win = document.getElementById('floatingChatWindow');
      if (!win) return;
      this.isMinimized = !this.isMinimized;
      win.classList.toggle('minimized', this.isMinimized);
    },

    showPreview(message) {
      const preview = document.getElementById('chatFloatingPreview');
      if (!preview) return;

      const avt = document.getElementById('chatPreviewAvatar');
      const sender = document.getElementById('chatPreviewSender');
      const text = document.getElementById('chatPreviewText');

      if (avt) avt.textContent = (message.userName || '?').charAt(0).toUpperCase();
      if (sender) sender.textContent = message.userName || 'Bạn học';
      if (text) text.textContent = message.text || '';

      preview.classList.remove('hidden');
      clearTimeout(this.previewTimer);
      this.previewTimer = setTimeout(() => {
        this.hidePreview();
      }, 4500);
    },

    hidePreview() {
      const preview = document.getElementById('chatFloatingPreview');
      if (preview) preview.classList.add('hidden');
    },

    updateBadges() {
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
    }
  };

  // --- Bảng Xếp Hạng Trực Tiếp (Live Leaderboard trong Versus Mode) ---
  const Leaderboard = {
    nextTimer: null,
    countdownSeconds: 5,

    show(roundPointsMap = {}) {
      const modal = document.getElementById('liveLeaderboardModal');
      const list = document.getElementById('leaderboardList');
      const roundText = document.getElementById('leaderboardRoundText');
      const timerBadge = document.getElementById('leaderboardTimerBadge');
      if (!modal || !list) return;

      const sorted = [...State.members].sort((a, b) => (b.score || 0) - (a.score || 0));

      if (roundText) {
        roundText.textContent = `Câu ${State.currentIndex + 1}/${State.questions.length} · Kết quả vòng đấu`;
      }

      const colors = ['#4285f4', '#ea4335', '#fbbc05', '#34a853', '#9b72cb', '#ff6d00', '#00b0ff', '#00c853'];
      let html = '';

      sorted.forEach((m, idx) => {
        const rank = idx + 1;
        const isMe = State.currentUser && m.id === State.currentUser.id;
        const color = colors[idx % colors.length];
        const roundPts = roundPointsMap[m.id]?.points || 0;
        const medal = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : rank));

        html += `
          <div class="leaderboard-item ${isMe ? 'me' : ''} ${rank <= 3 ? 'top-' + rank : ''}">
            <div class="rank-badge">${medal}</div>
            <div class="leaderboard-avatar" style="background-color:${color}">
              ${(m.name || '?').charAt(0).toUpperCase()}
            </div>
            <div class="leaderboard-user-info">
              <div class="leaderboard-name">
                <span>${m.name}${isMe ? ' (Bạn)' : ''}</span>
                ${m.isHost ? '<span>👑</span>' : ''}
              </div>
              ${m.streak >= 2 ? `<div class="leaderboard-streak">🔥 Chuỗi ${m.streak} câu đúng</div>` : ''}
            </div>
            <div class="leaderboard-score-info">
              <span class="round-points ${roundPts > 0 ? '' : 'zero'}">${roundPts > 0 ? '+' + roundPts + 'đ' : '0đ'}</span>
              <span class="total-score">${m.score || 0}đ</span>
            </div>
          </div>
        `;
      });

      list.innerHTML = html;
      modal.classList.remove('hidden');

      this.countdownSeconds = 5;
      if (timerBadge) timerBadge.textContent = `Câu tiếp theo trong: ${this.countdownSeconds}s`;

      clearInterval(this.nextTimer);
      this.nextTimer = setInterval(() => {
        this.countdownSeconds--;
        if (timerBadge) timerBadge.textContent = `Câu tiếp theo trong: ${this.countdownSeconds}s`;
        if (this.countdownSeconds <= 0) {
          clearInterval(this.nextTimer);
          modal.classList.add('hidden');
          if (State.currentUser?.isHost) {
            App.nextQuestion();
          }
        }
      }, 1000);

      const closeBtn = document.getElementById('closeLeaderboardModal');
      const closeBtn2 = document.getElementById('leaderboardCloseBtn');
      const nextBtn = document.getElementById('leaderboardNextBtn');

      const hide = () => {
        clearInterval(this.nextTimer);
        modal.classList.add('hidden');
      };
      if (closeBtn) closeBtn.onclick = hide;
      if (closeBtn2) closeBtn2.onclick = hide;
      if (nextBtn) {
        nextBtn.onclick = () => {
          hide();
          if (State.currentUser?.isHost) {
            App.nextQuestion();
          } else {
            showToast('Chỉ Host mới có quyền chuyển câu ngay lập tức.');
          }
        };
      }
    }
  };

  // --- Danh Mục Bên Trái (Left Sidebar) ---
  const Sidebar = {
    init() {
      const toggleBtn = document.getElementById('sidebarToggleBtn');
      const closeBtn = document.getElementById('closeSidebarBtn');
      const scrim = document.getElementById('sidebarScrim');
      const quickLiveBtn = document.getElementById('navLiveQuickBtn');
      const sidebarLiveBtn = document.getElementById('sidebarLiveBtn');
      const addSubjectBtn = document.getElementById('sidebarAddSubjectBtn');
      const soundBtn = document.getElementById('sidebarSoundBtn');
      const themeBtn = document.getElementById('sidebarThemeBtn');
      const helpBtn = document.getElementById('sidebarHelpBtn');

      if (toggleBtn) toggleBtn.addEventListener('click', () => this.toggle(true));
      if (closeBtn) closeBtn.addEventListener('click', () => this.toggle(false));
      if (scrim) scrim.addEventListener('click', () => this.toggle(false));

      // Nút Trang chủ và Danh mục trên Sidebar
      const sidebarHomeBtn = document.getElementById('sidebarHomeBtn');
      const sidebarSubjectsBtn = document.getElementById('sidebarSubjectsBtn');
      if (sidebarHomeBtn) {
        sidebarHomeBtn.addEventListener('click', () => {
          this.toggle(false);
          App.switchView('welcome');
        });
      }
      if (sidebarSubjectsBtn) {
        sidebarSubjectsBtn.addEventListener('click', () => {
          this.toggle(false);
          App.switchView('subjects');
        });
      }

      // Nút Phòng Live trên Sidebar & Topbar
      const goToLive = () => {
        this.toggle(false);
        App.switchView('liveLobby');
      };

      if (quickLiveBtn) quickLiveBtn.addEventListener('click', goToLive);
      if (sidebarLiveBtn) sidebarLiveBtn.addEventListener('click', goToLive);

      if (addSubjectBtn) {
        addSubjectBtn.addEventListener('click', () => {
          this.toggle(false);
          const modal = document.getElementById('addSubjectModal');
          if (modal) modal.classList.remove('hidden');
        });
      }

      if (soundBtn) soundBtn.addEventListener('click', () => Sound.toggleMute());
      if (themeBtn) themeBtn.addEventListener('click', () => App.toggleTheme());
      if (helpBtn) {
        helpBtn.addEventListener('click', () => {
          this.toggle(false);
          const modal = document.getElementById('addSubjectModal');
          if (modal) modal.classList.remove('hidden');
        });
      }
    },

    toggle(open) {
      const sidebar = document.getElementById('appSidebar');
      const scrim = document.getElementById('sidebarScrim');
      if (!sidebar) return;
      if (open === undefined) open = !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', open);
      if (scrim) scrim.classList.toggle('show', open);
    },

    renderSubjectList() {
      const list = document.getElementById('sidebarSubjectList');
      if (!list) return;
      const courses = window.COURSES_DATA || window.SUBJECTS_DATA || [];
      let html = '';
      courses.forEach(c => {
        const isActive = c.id === State.currentSubjectId;
        const totalQ = c.chapters.reduce((sum, ch) => sum + ch.questions.length, 0);
        html += `
          <button class="sidebar-menu-item ${isActive ? 'active' : ''}" data-subject-id="${c.id}">
            <span class="material-symbols-rounded" style="color:${c.color || 'var(--primary)'}">${c.icon || 'school'}</span>
            <span>${c.title}</span>
            <span class="item-badge">${totalQ}c</span>
          </button>
        `;
      });
      list.innerHTML = html;

      list.querySelectorAll('.sidebar-menu-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const sId = btn.dataset.subjectId;
          if (sId) {
            State.currentSubjectId = sId;
            App.switchView('subjects');
            App.renderSubjects();
            this.toggle(false);
            showToast(`Đã chọn môn: ${App.getCurrentCourse()?.title}`);
            const wrap = document.getElementById('subjectContentWrap');
            if (wrap) wrap.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }
  };

  // --- Sảnh Phòng Live Độc Lập (Live Lobby Controller) ---
  const LiveLobby = {
    activeRooms: [],
    pendingJoinRoomId: null,

    init() {
      // 1. Nút mở modal tạo phòng
      const openModalBtn = document.getElementById('lobbyOpenCreateModalBtn');
      const emptyCreateBtn = document.getElementById('emptyCreateRoomBtn');
      const quickLaunchBtn = document.getElementById('quickLaunchLiveForSubjectBtn');

      if (openModalBtn) openModalBtn.addEventListener('click', () => this.openCreateModal());
      if (emptyCreateBtn) emptyCreateBtn.addEventListener('click', () => this.openCreateModal());
      if (quickLaunchBtn) quickLaunchBtn.addEventListener('click', () => {
        this.openCreateModal(State.currentSubjectId);
      });

      // 2. Nút làm mới danh sách phòng
      const refreshBtn = document.getElementById('lobbyRefreshBtn');
      if (refreshBtn) refreshBtn.addEventListener('click', () => {
        this.fetchActiveRooms();
        showToast('Đang cập nhật danh sách phòng Live...');
      });

      // 3. Vào nhanh bằng mã phòng
      const quickJoinBtn = document.getElementById('lobbyQuickJoinBtn');
      const quickCodeInput = document.getElementById('lobbyQuickCodeInput');
      if (quickJoinBtn && quickCodeInput) {
        quickJoinBtn.addEventListener('click', () => {
          const code = (quickCodeInput.value || '').trim().toUpperCase();
          if (!code) {
            showToast('Vui lòng nhập mã phòng!');
            return;
          }
          this.joinRoom(code);
        });
      }

      // 4. Modal tạo phòng nhỏ gọn
      const createModal = document.getElementById('createRoomModal');
      const closeModalBtn = document.getElementById('closeCreateRoomModalBtn');
      const cancelModalBtn = document.getElementById('cancelCreateRoomModalBtn');
      const confirmCreateBtn = document.getElementById('confirmCreateRoomModalBtn');
      const modalSubjectSelect = document.getElementById('modalSubjectSelect');
      const modalRoomInput = document.getElementById('modalRoomIdInput');

      const hideCreateModal = () => {
        if (createModal) createModal.classList.add('hidden');
      };
      if (closeModalBtn) closeModalBtn.addEventListener('click', hideCreateModal);
      if (cancelModalBtn) cancelModalBtn.addEventListener('click', hideCreateModal);

      if (modalSubjectSelect) {
        modalSubjectSelect.addEventListener('change', () => {
          const sId = modalSubjectSelect.value;
          const courses = window.COURSES_DATA || window.SUBJECTS_DATA || [];
          const c = courses.find(x => x.id === sId);
          if (c && modalRoomInput) {
            const prefix = (c.code || c.id).replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 6);
            modalRoomInput.value = prefix ? `${prefix}` : 'LIVE';
          }
        });
      }

      // Chế độ thi đấu trong modal
      const modalModeSelector = document.getElementById('modalModeSelector');
      if (modalModeSelector) {
        modalModeSelector.addEventListener('click', (e) => {
          const btn = e.target.closest('button[data-mode]');
          if (!btn) return;
          modalModeSelector.querySelectorAll('button').forEach(b => b.classList.remove('on'));
          btn.classList.add('on');
        });
      }

      // Thời gian mỗi câu trong modal
      const modalTimerSelector = document.getElementById('modalTimerSelector');
      if (modalTimerSelector) {
        modalTimerSelector.addEventListener('click', (e) => {
          const btn = e.target.closest('button[data-timer]');
          if (!btn) return;
          modalTimerSelector.querySelectorAll('button').forEach(b => b.classList.remove('on'));
          btn.classList.add('on');
        });
      }

      if (confirmCreateBtn) {
        confirmCreateBtn.addEventListener('click', () => {
          const nameInput = document.getElementById('modalUserNameInput');
          const roomInput = document.getElementById('modalRoomIdInput');
          const subjectSelect = document.getElementById('modalSubjectSelect');
          const activeModeBtn = document.querySelector('#modalModeSelector button.on');
          const activeTimerBtn = document.querySelector('#modalTimerSelector button.on');

          const name = (nameInput?.value || '').trim() || 'Bạn ' + Math.floor(Math.random() * 90 + 10);
          const room = (roomInput?.value || '').trim().toUpperCase() || 'SHDC';
          const subjectId = subjectSelect?.value || 'sinh_hoc_a1';
          const mode = activeModeBtn?.dataset.mode || 'coop';
          const timer = parseInt(activeTimerBtn?.dataset.timer, 10) || 30;

          const courses = window.COURSES_DATA || window.SUBJECTS_DATA || [];
          const selectedCourse = courses.find(c => c.id === subjectId);

          State.currentSubjectId = subjectId;
          State.liveModeType = mode;
          State.liveTimerSeconds = timer;

          hideCreateModal();
          LiveRoom.connect(room, name, false, {
            subjectId: subjectId,
            subjectTitle: selectedCourse ? selectedCourse.title : 'Môn học',
            mode: mode,
            timerSeconds: timer
          });
        });
      }

      // 5. Modal nhập tên nhanh khi bấm "Tham Gia"
      const quickJoinModal = document.getElementById('quickJoinModal');
      const closeQjBtn = document.getElementById('closeQuickJoinModalBtn');
      const cancelQjBtn = document.getElementById('cancelQuickJoinModalBtn');
      const confirmQjBtn = document.getElementById('confirmQuickJoinModalBtn');
      const qjInput = document.getElementById('quickJoinUserNameInput');

      const hideQjModal = () => {
        if (quickJoinModal) quickJoinModal.classList.add('hidden');
        this.pendingJoinRoomId = null;
      };
      if (closeQjBtn) closeQjBtn.addEventListener('click', hideQjModal);
      if (cancelQjBtn) cancelQjBtn.addEventListener('click', hideQjModal);

      if (confirmQjBtn) {
        confirmQjBtn.addEventListener('click', () => {
          const name = (qjInput?.value || '').trim() || 'Bạn ' + Math.floor(Math.random() * 90 + 10);
          localStorage.setItem('sh_username', name);
          const rId = this.pendingJoinRoomId;
          hideQjModal();
          if (rId) {
            LiveRoom.connect(rId, name);
          }
        });
      }

      // 6. Delegation cho nút "Tham Gia" trên các thẻ phòng
      const roomsGrid = document.getElementById('activeRoomsGrid');
      if (roomsGrid) {
        roomsGrid.addEventListener('click', (e) => {
          const btn = e.target.closest('.lobby-join-room-btn');
          if (!btn) return;
          const roomId = btn.dataset.roomId;
          const subjectId = btn.dataset.subjectId;
          if (subjectId) {
            State.currentSubjectId = subjectId;
          }
          if (roomId) {
            this.joinRoom(roomId);
          }
        });
      }
    },

    openCreateModal(preselectedSubjectId = null) {
      const modal = document.getElementById('createRoomModal');
      const select = document.getElementById('modalSubjectSelect');
      const nameInput = document.getElementById('modalUserNameInput');
      const roomInput = document.getElementById('modalRoomIdInput');
      if (!modal || !select) return;

      const courses = window.COURSES_DATA || window.SUBJECTS_DATA || [];
      select.innerHTML = '';
      courses.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.title} (${c.chapters.length} chương)`;
        select.appendChild(opt);
      });

      const chosenSubject = preselectedSubjectId || State.currentSubjectId || (courses[0] ? courses[0].id : '');
      if (chosenSubject) {
        select.value = chosenSubject;
      }

      const savedName = localStorage.getItem('sh_username') || '';
      if (nameInput) nameInput.value = savedName;

      const currentCourse = courses.find(c => c.id === select.value);
      if (roomInput && currentCourse) {
        const prefix = (currentCourse.code || currentCourse.id).replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 6);
        roomInput.value = prefix ? `${prefix}` : 'SHDC';
      }

      modal.classList.remove('hidden');
    },

    joinRoom(roomId) {
      const savedName = localStorage.getItem('sh_username');
      if (!savedName) {
        this.pendingJoinRoomId = roomId;
        const modal = document.getElementById('quickJoinModal');
        const title = document.getElementById('quickJoinTitle');
        const input = document.getElementById('quickJoinUserNameInput');
        if (title) title.textContent = `Tham Gia Phòng: ${roomId}`;
        if (modal) modal.classList.remove('hidden');
        if (input) setTimeout(() => input.focus(), 100);
      } else {
        LiveRoom.connect(roomId, savedName);
      }
    },

    fetchActiveRooms() {
      // 1. Qua WebSocket nếu đang kết nối
      if (LiveRoom.ws && LiveRoom.ws.readyState === WebSocket.OPEN) {
        LiveRoom.send({ type: 'get_active_rooms' });
      }

      // 2. Fetch API HTTP
      fetch('/api/active-rooms')
        .then(res => res.json())
        .then(rooms => {
          this.renderActiveRooms(rooms);
        })
        .catch(() => {});
    },

    renderActiveRooms(rooms = []) {
      this.activeRooms = rooms;
      const grid = document.getElementById('activeRoomsGrid');
      const empty = document.getElementById('emptyRoomsState');
      const badge = document.getElementById('activeRoomsCountBadge');

      if (badge) {
        badge.textContent = `${rooms.length} phòng đang mở`;
      }

      if (!grid) return;

      if (!rooms || rooms.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        return;
      }

      if (empty) empty.classList.add('hidden');

      let html = '';
      rooms.forEach(r => {
        const modeLabel = r.mode === 'versus' ? 'Versus ⚔️' : 'Co-op 👥';
        const modeClass = r.mode === 'versus' ? 'versus' : 'coop';
        const statusText = r.hasStarted
          ? `🟢 Đang thi đấu (Câu ${(r.currentQuestionIndex || 0) + 1}/${r.questionCount || '?'})`
          : `⏳ Đang chờ người vào`;

        html += `
          <div class="active-room-card">
            <div>
              <div class="room-card-head">
                <span class="room-code-badge"><span class="live-dot-mini"></span> PHÒNG: ${r.id}</span>
                <span class="room-mode-tag ${modeClass}">${modeLabel}</span>
              </div>
              <div class="room-subject-title">
                <span class="material-symbols-rounded" style="color:var(--primary); font-size:20px;">school</span>
                <span>${r.subjectTitle || 'Chưa chọn môn'}</span>
              </div>
              <div class="room-host-line">
                <span>Chủ phòng: <b>${r.hostName || 'Host'}</b> 👑</span>
              </div>
            </div>

            <div class="room-stats-row">
              <span class="room-status-indicator">${statusText}</span>
              <span><b>${r.memberCount || 1}/${r.maxMembers || 10}</b> bạn</span>
            </div>

            <button class="btn primary full lobby-join-room-btn" data-room-id="${r.id}" data-subject-id="${r.subjectId || ''}">
              <span class="material-symbols-rounded">sensors</span> Tham gia ngay
            </button>
          </div>
        `;
      });

      grid.innerHTML = html;
    }
  };

  // --- Live Room WebSocket Controller (Phòng 10 người, Co-op & Versus) ---
  const LiveRoom = {
    ws: null,
    connected: false,
    bannerTimer: null,
    manualLeave: false,
    reconnectTimer: null,
    lastOptions: {},

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

      // Theo dõi chuyển tab (visibilitychange): Báo trạng thái away / active
      document.addEventListener('visibilitychange', () => {
        const isHidden = document.visibilityState === 'hidden';
        if (State.liveMode && this.connected) {
          this.send({
            type: 'user_activity',
            state: isHidden ? 'away' : 'active'
          });
        }
        if (!isHidden && State.liveMode && !this.manualLeave) {
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
        this.connect(State.roomId || 'SHDC', State.userName || 'Bạn học', true, this.lastOptions);
      }
    },

    connect(roomId, userName, isReconnecting = false, options = {}) {
      this.manualLeave = false;
      this.lastOptions = options || {};
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
          userName: userName,
          subjectId: options.subjectId,
          subjectTitle: options.subjectTitle,
          mode: options.mode,
          timerSeconds: options.timerSeconds
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
        case 'active_rooms_update': {
          LiveLobby.renderActiveRooms(msg.rooms || []);
          break;
        }

        case 'room_joined': {
          State.roomId = msg.roomId;
          State.currentUser = msg.user;
          State.members = msg.members || [];

          if (msg.quizState) {
            State.liveModeType = msg.quizState.mode || 'coop';
            State.liveTimerSeconds = msg.quizState.timerSeconds || 30;
          }

          this.updateRoomBar();
          this.renderMembers();
          this.renderMessages(msg.messages || []);
          VoiceChat.updateBtnUI();

          // Nếu có thành viên đang bật mic trong phòng, chủ động kết nối để sẵn sàng nghe
          if (State.members && State.members.length > 0) {
            State.members.forEach(m => {
              if (m.id !== State.currentUser?.id && m.voiceActive) {
                VoiceChat.getOrCreatePeer(m.id);
              }
            });
          }

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
            QuestionTimer.start(State.liveTimerSeconds);
          } else if (!msg.reconnected) {
            App.switchView('subjects');
            App.renderSubjects();
            showToast(`Đã vào phòng ${msg.roomId}! Hãy chọn 1 chương bên dưới để bắt đầu.`);
          }
          break;
        }

        case 'user_status_changed':
        case 'user_activity_changed': {
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
          if (msg.userId) VoiceChat.removePeer(msg.userId);
          if (msg.newHostId && State.currentUser && msg.newHostId === State.currentUser.id) {
            State.currentUser.isHost = true;
          }
          this.updateRoomBar();
          this.renderMembers();
          if (msg.message) {
            this.addSystemMessage(msg.message);
            showToast(msg.message);
          }
          break;
        }

        case 'host_transferred': {
          State.members = msg.members || [];
          if (State.currentUser) {
            State.currentUser.isHost = (msg.newHostId === State.currentUser.id);
          }
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
          if (msg.user && msg.user.id !== State.currentUser?.id && VoiceChat.joined) {
            VoiceChat.getOrCreatePeer(msg.user.id);
          }
          break;
        }

        case 'user_left': {
          State.members = msg.members || [];
          if (msg.userId) VoiceChat.removePeer(msg.userId);
          if (msg.newHostId && State.currentUser && msg.newHostId === State.currentUser.id) {
            State.currentUser.isHost = true;
          }
          this.updateRoomBar();
          this.renderMembers();
          showToast(msg.message);
          this.addSystemMessage(msg.message);
          break;
        }

        case 'quiz_started': {
          if (msg.quizState && msg.quizState.subjectId) {
            State.currentSubjectId = msg.quizState.subjectId;
            localStorage.setItem('sh_current_subject', msg.quizState.subjectId);
          }
          State.questions = msg.quizState.questions;
          State.currentIndex = msg.quizState.currentIndex || 0;
          State.userAnswers = msg.quizState.userAnswers || {};
          State.chapterTitle = msg.quizState.chapterTitle;
          State.liveModeType = msg.quizState.mode || 'coop';
          State.liveTimerSeconds = msg.quizState.timerSeconds || 30;
          State.members = msg.members || State.members;

          document.getElementById('quizChapter').textContent = State.chapterTitle;
          this.updateRoomBar();
          this.renderMembers();

          const modeText = State.liveModeType === 'versus' ? 'Versus (Đấu điểm)' : 'Co-op (Cùng làm)';
          this.showSyncBanner(`🚀 ${msg.userName} đã bắt đầu bài thi [${modeText}]: ${State.chapterTitle}`);

          App.switchView('quiz');
          App.renderCurrentQuestion();
          App.updateDrawerGrid();
          QuestionTimer.start(State.liveTimerSeconds);
          Sound.shuffle();
          break;
        }

        case 'option_selected': {
          // Co-op mode: Một người chọn cả phòng chọn theo
          const letters = ['A', 'B', 'C', 'D'];
          State.userAnswers[msg.qIndex] = {
            selectedIndex: msg.optIndex,
            isCorrect: msg.isCorrect,
            selectedBy: msg.userName
          };
          State.members = msg.members || State.members;
          this.renderMembers();

          this.showSyncBanner(`⚡ ${msg.userName} đã chọn đáp án ${letters[msg.optIndex]} (${msg.isCorrect ? 'ĐÚNG' : 'CHƯA ĐÚNG'})`);

          if (msg.isCorrect) Sound.correct();
          else Sound.wrong();

          App.renderCurrentQuestion();
          App.updateDrawerGrid();
          break;
        }

        case 'versus_answer_recorded': {
          // Versus mode: Cập nhật trạng thái người đã trả lời & điểm số
          State.members = msg.members || State.members;
          this.renderMembers();

          if (msg.userId !== State.currentUser?.id) {
            this.showSyncBanner(`⚡ ${msg.userName} đã nộp câu trả lời!`);
          }

          if (msg.allAnswered) {
            QuestionTimer.stop();
            Leaderboard.show(msg.playerAnswers);
            Sound.streak();
          }
          break;
        }

        case 'question_navigated': {
          State.currentIndex = msg.qIndex;
          State.members = msg.members || State.members;
          this.renderMembers();
          this.showSyncBanner(`👉 ${msg.userName} đã chuyển sang câu ${msg.qIndex + 1}`);
          App.renderCurrentQuestion();
          App.updateDrawerGrid();
          QuestionTimer.start(State.liveTimerSeconds);
          break;
        }

        case 'quiz_shuffled': {
          State.questions = msg.questions;
          State.currentIndex = 0;
          State.userAnswers = {};
          State.members = msg.members || State.members;
          this.renderMembers();
          this.showSyncBanner(`🔀 ${msg.userName} đã xáo trộn câu hỏi và đáp án!`);
          Sound.shuffle();
          App.renderCurrentQuestion();
          App.updateDrawerGrid();
          QuestionTimer.start(State.liveTimerSeconds);
          break;
        }

        case 'chat_broadcast': {
          this.appendMessage(msg.message);
          if (!FloatingChat.isOpen || FloatingChat.isMinimized) {
            FloatingChat.unreadCount++;
            FloatingChat.updateBadges();
            FloatingChat.showPreview(msg.message);
            if (msg.message.userId !== State.currentUser?.id) {
              Sound.playTone(800, 'sine', 0.1, 0, 0.08);
            }
          }
          break;
        }

        case 'reaction_broadcast': {
          this.showFloatingReaction(msg.emoji, msg.userName);
          break;
        }

        case 'voice_signal': {
          VoiceChat.handleSignal(msg.senderUserId, msg.signal);
          break;
        }

        case 'voice_mute_changed': {
          State.members = msg.members || State.members;
          this.renderMembers();
          if (msg.voiceActive && msg.userId !== State.currentUser?.id) {
            VoiceChat.getOrCreatePeer(msg.userId);
          }
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
      const modeBadge = document.getElementById('liveModeBadge');
      const lbBtn = document.getElementById('showLeaderboardBtn');
      if (!bar) return;

      if (State.liveMode) {
        bar.classList.remove('hidden');
        if (floatBtn) floatBtn.classList.remove('hidden');
        document.getElementById('liveRoomCode').textContent = `PHÒNG: ${State.roomId}`;
        document.getElementById('liveMembersCount').textContent = `(${State.members.length}/10 bạn)`;
        const cCount = document.getElementById('chatMembersCount');
        if (cCount) cCount.textContent = State.members.length;

        if (modeBadge) {
          const isVersus = State.liveModeType === 'versus';
          modeBadge.textContent = isVersus ? 'Versus (Đấu điểm)' : 'Co-op (Học chung)';
          modeBadge.className = 'live-mode-badge ' + (isVersus ? 'versus' : '');
        }

        if (lbBtn) {
          if (State.liveModeType === 'versus') lbBtn.classList.remove('hidden');
          else lbBtn.classList.add('hidden');
        }
      } else {
        bar.classList.add('hidden');
        if (floatBtn) floatBtn.classList.add('hidden');
        if (lbBtn) lbBtn.classList.add('hidden');
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
        const isAway = m.activity === 'away';
        const isAnswered = m.answerStatus === 'answered';
        const color = colors[idx % colors.length];
        const initial = (m.name || '?').charAt(0).toUpperCase();

        let statusDotClass = 'thinking';
        let statusTitle = 'Đang suy nghĩ';
        if (isOffline) {
          statusDotClass = 'offline';
          statusTitle = 'Mất kết nối (giữ chỗ 90s)';
        } else if (isAway) {
          statusDotClass = 'away';
          statusTitle = 'Đang chuyển tab';
        } else if (isAnswered) {
          statusDotClass = 'answered';
          statusTitle = 'Đã chọn đáp án';
        }

        const avt = document.createElement('div');
        avt.className = 'member-avatar' + (isMe ? ' me' : '') + (isOffline ? ' offline' : '');
        avt.style.backgroundColor = color;
        avt.title = `${m.name}${isMe ? ' (Bạn)' : ''} — ${statusTitle}${m.isHost ? ' [Host]' : ''}`;

        const crownHtml = m.isHost ? '<span class="host-crown" title="Host phòng">👑</span>' : '';
        const voiceHtml = m.voiceActive ? `<span class="voice-badge ${m.voiceMuted ? 'muted' : ''}" title="${m.voiceMuted ? 'Mic đang tắt' : 'Đang bật mic'}">${m.voiceMuted ? '🔇' : '🎙️'}</span>` : '';
        const streakHtml = (State.liveModeType === 'versus' && m.streak >= 2) ? `<span class="streak-pill">🔥${m.streak}</span>` : '';

        avt.innerHTML = `
          ${crownHtml}
          ${voiceHtml}
          <span>${initial}</span>
          <span class="status-dot ${statusDotClass}"></span>
          ${streakHtml}
        `;
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

    exitLiveMode() {
      this.manualLeave = true;
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      VoiceChat.leaveVoice();
      QuestionTimer.hide();
      FloatingChat.closeWindow();

      if (this.ws) {
        this.send({ type: 'leave_room' });
        try { this.ws.close(); } catch (e) {}
        this.ws = null;
      }
      State.liveMode = false;
      State.roomId = null;
      this.updateRoomBar();
      showToast('Đã rời khỏi phòng học Live.');
      App.switchView('liveLobby');
    }
  };

  // --- Main Controller ---
  const App = {
    init() {
      this.applyTheme(State.theme);
      Sound.updateIcons();
      Sidebar.init();
      Sidebar.renderSubjectList();
      FloatingChat.init();
      LiveLobby.init();
      VoiceChat.init();
      this.renderWelcome();
      this.renderSubjects();
      this.switchView('welcome');
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

      const navHome = document.getElementById('navHomeBtn');
      const navSubjects = document.getElementById('navSubjectsBtn');
      const navLive = document.getElementById('navLiveLobbyBtn');

      if (navHome) navHome.classList.toggle('active', viewName === 'welcome');
      if (navSubjects) navSubjects.classList.toggle('active', viewName === 'subjects');
      if (navLive) navLive.classList.toggle('active', viewName === 'liveLobby');

      if (viewName === 'welcome') {
        this.renderWelcome();
      } else if (viewName === 'subjects') {
        this.renderSubjects();
      } else if (viewName === 'liveLobby') {
        LiveLobby.fetchActiveRooms();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    getCurrentCourse() {
      if (!State.currentSubjectId) return null;
      const courses = window.COURSES_DATA || window.SUBJECTS_DATA || [];
      return courses.find(c => c.id === State.currentSubjectId) || null;
    },

    renderWelcome() {
      const grid = document.getElementById('welcomeCoursesGrid');
      if (!grid) return;
      const courses = window.COURSES_DATA || window.SUBJECTS_DATA || [];
      let html = '';
      courses.forEach(c => {
        const totalQ = c.chapters.reduce((sum, ch) => sum + ch.questions.length, 0);
        html += `
          <div class="course-preview-card" data-course-id="${c.id}">
            <div class="course-preview-top">
              <div class="course-preview-icon" style="color:${c.color || 'var(--primary)'}">
                <span class="material-symbols-rounded">${c.icon || 'school'}</span>
              </div>
              <div class="course-preview-info">
                <h4>${c.title}</h4>
                <p>${c.description || ''}</p>
              </div>
            </div>
            <div class="course-preview-bottom">
              <div class="course-preview-stats">
                <span class="material-symbols-rounded" style="font-size:16px;">quiz</span>
                <span>${c.chapters.length} chương · ${totalQ} câu</span>
              </div>
              <button class="btn outline sm start-course-btn" data-course-id="${c.id}">
                Học môn này <span class="material-symbols-rounded">arrow_forward</span>
              </button>
            </div>
          </div>
        `;
      });
      grid.innerHTML = html;

      grid.querySelectorAll('.course-preview-card').forEach(card => {
        card.addEventListener('click', () => {
          const cId = card.dataset.courseId;
          if (cId) {
            State.currentSubjectId = cId;
            App.switchView('subjects');
            App.renderSubjects();
            showToast(`Đã chọn môn: ${App.getCurrentCourse()?.title}`);
            const wrap = document.getElementById('subjectContentWrap');
            if (wrap) wrap.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    },

    renderHome() {
      this.renderSubjects();
    },

    // --- Subjects View & Chapter selection ---
    renderSubjects() {
      Sidebar.renderSubjectList();
      const subjectGrid = document.getElementById('subjectGrid');
      const courses = window.COURSES_DATA || window.SUBJECTS_DATA || [];
      const current = this.getCurrentCourse();

      // 1. Render Subject Selector Cards
      if (subjectGrid && courses.length > 0) {
        let sHtml = '';
        courses.forEach(c => {
          const isActive = current && c.id === current.id;
          const totalQ = c.chapters.reduce((sum, ch) => sum + ch.questions.length, 0);
          sHtml += `
            <div class="subject-card ${isActive ? 'active' : ''}" data-subject-id="${c.id}">
              <div class="subject-card-head">
                <div class="subject-icon-box" style="color: ${c.color || 'var(--primary)'}">
                  <span class="material-symbols-rounded">${c.icon || 'school'}</span>
                </div>
                <span class="subject-badge ${isActive ? 'active-indicator' : ''}">
                  ${isActive ? '✓ Đang chọn' : 'Nhấp để chọn'}
                </span>
              </div>
              <div class="subject-card-name">${c.title}</div>
              <div class="subject-card-desc">${c.description || ''}</div>
              <div class="subject-card-meta">
                <div class="subject-card-stats">
                  <span class="material-symbols-rounded" style="font-size:16px;">library_books</span>
                  <span>${c.chapters.length} chương</span>
                </div>
                <div class="subject-card-stats">
                  <span class="material-symbols-rounded" style="font-size:16px;">quiz</span>
                  <span>${totalQ} câu</span>
                </div>
              </div>
            </div>
          `;
        });

        // Thẻ "+ Thêm môn học khác"
        sHtml += `
          <div class="subject-card add-card" id="openAddSubjectBtn" title="Xem hướng dẫn thêm môn học mới">
            <span class="material-symbols-rounded">add_circle</span>
            <b>+ Thêm môn học khác</b>
            <span>Tạo thêm đề thi môn mới dễ dàng</span>
          </div>
        `;
        subjectGrid.innerHTML = sHtml;
      }

      const emptyPrompt = document.getElementById('emptySubjectPrompt');
      const contentWrap = document.getElementById('subjectContentWrap');
      const topbarBrandSub = document.getElementById('topbarBrandSub');

      if (!current) {
        // CHƯA CHỌN MÔN: Ẩn phần chi tiết bên dưới, hiện ô hướng dẫn
        if (emptyPrompt) emptyPrompt.classList.remove('hidden');
        if (contentWrap) contentWrap.classList.add('hidden');
        if (topbarBrandSub) topbarBrandSub.textContent = 'Chọn môn học để bắt đầu';
        return;
      }

      // ĐÃ CHỌN MÔN: Hiện phần chi tiết bên dưới
      if (emptyPrompt) emptyPrompt.classList.add('hidden');
      if (contentWrap) contentWrap.classList.remove('hidden');

      // 2. Update Hero & Titles
      const totalQ = current.chapters.reduce((sum, ch) => sum + ch.questions.length, 0);
      const heroChipText = document.getElementById('subjectHeroChipText');
      const heroTitle = document.getElementById('subjectHeroTitle');
      const heroDesc = document.getElementById('subjectHeroDesc');
      const chSectionTitle = document.getElementById('chapterSectionTitle');

      if (heroChipText) heroChipText.textContent = `${totalQ} câu trắc nghiệm · ${current.chapters.length} chương`;
      if (heroTitle) heroTitle.textContent = `Ôn tập ${current.title}`;
      if (heroDesc) heroDesc.innerHTML = `Chọn chương của <b>${current.title}</b> để luyện tập hoặc tham gia <b>Phòng học Live 10 người</b> để học cùng bạn bè.`;
      if (chSectionTitle) chSectionTitle.textContent = `Các chương của môn ${current.title}:`;
      if (topbarBrandSub) topbarBrandSub.textContent = `Môn hiện tại: ${current.title}`;

      // 3. Render Chapters of current subject
      const chapterGrid = document.getElementById('chapterGrid');
      if (!chapterGrid) return;
      let html = '';

      // Card for "Tất cả các chương"
      const allScoreKey = `${current.id}_all`;
      const allBest = State.highScores[allScoreKey] || State.highScores['all'];
      html += `
        <button class="chapter all" data-id="all">
          <div class="ch-icon"><span class="material-symbols-rounded">stars</span></div>
          <h4>Tất cả câu hỏi (${current.title})</h4>
          <div class="ch-meta">
            <span>Toàn bộ ${totalQ} câu</span>
            ${allBest ? `<span class="ch-best">Điểm cao: ${allBest.score}/${allBest.total} (${allBest.pct}%)</span>` : ''}
          </div>
        </button>
      `;

      // Cards for each chapter
      current.chapters.forEach(ch => {
        const scoreKey = `${current.id}_${ch.id}`;
        const best = State.highScores[scoreKey] || State.highScores[ch.id];
        html += `
          <button class="chapter" data-id="${ch.id}">
            <div class="ch-icon"><span class="material-symbols-rounded">${current.icon || 'science'}</span></div>
            <h4>${ch.title}</h4>
            <div class="ch-meta">
              <span>${ch.questions.length} câu hỏi</span>
              ${best ? `<span class="ch-best">${best.score}/${best.total} (${best.pct}%)</span>` : ''}
            </div>
          </button>
        `;
      });

      chapterGrid.innerHTML = html;
    },

    startQuiz(chapterId, customQuestions = null, customTitle = null) {
      const current = this.getCurrentCourse();
      if (!current) return;

      State.activeChapterId = chapterId;
      State.userAnswers = {};
      State.currentIndex = 0;

      let rawList = [];
      let title = '';

      if (customQuestions) {
        rawList = customQuestions;
        title = customTitle || 'Luyện tập câu sai';
      } else if (chapterId === 'all') {
        title = `Tổng hợp tất cả – ${current.title}`;
        current.chapters.forEach(c => {
          c.questions.forEach(q => {
            rawList.push({ ...q, _chTitle: c.short || c.title });
          });
        });
      } else {
        const found = current.chapters.find(c => c.id === chapterId);
        if (!found) return;
        title = `${current.title}: ${found.title}`;
        rawList = found.questions.map(q => ({ ...q, _chTitle: found.short || found.title }));
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
          subjectId: current.id,
          subjectTitle: current.title,
          chapterId: State.activeChapterId,
          chapterTitle: title,
          questions: prepared,
          mode: State.liveModeType || 'coop',
          timerSeconds: State.liveTimerSeconds || 30
        });
      }

      document.getElementById('quizChapter').textContent = title;
      this.saveSession();
      this.switchView('quiz');
      this.renderCurrentQuestion();
      this.updateDrawerGrid();
      QuestionTimer.start(State.liveTimerSeconds || 30);
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
      QuestionTimer.start(State.liveTimerSeconds || 30);
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

    handleOptionClick(optIndex, isTimeout = false) {
      if (State.userAnswers[State.currentIndex]) return; // already answered

      const q = State.questions[State.currentIndex];
      const isCorrect = (optIndex >= 0 && optIndex === q.correctOptionIdx);

      // Nếu đang ở phòng Live chế độ Đấu Điểm (Versus Mode)
      if (State.liveMode && State.liveModeType === 'versus') {
        let points = 0;
        if (isCorrect) {
          const t = Math.max(0, QuestionTimer.timeLeft || 0);
          const tot = QuestionTimer.totalSeconds || 30;
          if (t >= tot - 3) {
            points = 1000;
          } else {
            const ratio = t / Math.max(1, tot - 3);
            points = Math.max(200, Math.round(200 + 800 * ratio));
          }
          const myMember = State.members.find(m => m.id === State.currentUser?.id);
          const currentStreak = ((myMember?.streak || 0) + 1);
          const streakBonus = Math.min(250, (currentStreak - 1) * 50);
          points += streakBonus;
          Sound.correct();
          showToast(`+${points} điểm! ${currentStreak >= 2 ? '🔥 Chuỗi ' + currentStreak : ''}`);
        } else {
          Sound.wrong();
          showToast(isTimeout ? '⏰ Hết thời gian làm bài!' : '❌ Chưa chính xác!');
        }

        State.userAnswers[State.currentIndex] = {
          selectedIndex: optIndex,
          isCorrect: isCorrect,
          selectedBy: 'Bạn'
        };

        LiveRoom.send({
          type: 'versus_submit_answer',
          qIndex: State.currentIndex,
          optIndex: optIndex,
          isCorrect: isCorrect,
          timeLeft: QuestionTimer.timeLeft,
          totalTime: QuestionTimer.totalSeconds
        });

        this.saveSession();
        this.renderCurrentQuestion();
        return;
      }

      // Co-op mode hoặc tự luyện tập cá nhân
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

      // ĐỒNG BỘ SANG CÁC BẠN KHÁC TRONG PHÒNG (Co-op: một người chọn cả phòng chọn theo)
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
          QuestionTimer.start(State.liveTimerSeconds || 30);
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
        QuestionTimer.start(State.liveTimerSeconds || 30);
        this.renderCurrentQuestion();
      } else {
        QuestionTimer.hide();
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
        QuestionTimer.start(State.liveTimerSeconds || 30);
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
        const current = this.getCurrentCourse();
        const scoreKey = current ? `${current.id}_${State.activeChapterId}` : State.activeChapterId;
        const prev = State.highScores[scoreKey];
        if (!prev || pct > prev.pct) {
          State.highScores[scoreKey] = { score: good, total, pct };
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

      if (!raw || State.liveMode || !State.currentSubjectId) {
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

      // Brand / Home click -> Về Trang Giới thiệu
      const homeBtn = document.getElementById('homeBtn');
      if (homeBtn) {
        homeBtn.addEventListener('click', () => {
          if (State.currentView === 'quiz') {
            if (confirm('Bạn có muốn tạm dừng bài kiểm tra và quay về trang chủ?')) {
              this.saveSession();
              this.checkResumeState();
              this.switchView('welcome');
            }
          } else {
            this.switchView('welcome');
          }
        });
      }

      // Topbar Navigation Links
      const navHomeBtn = document.getElementById('navHomeBtn');
      if (navHomeBtn) navHomeBtn.addEventListener('click', () => this.switchView('welcome'));

      const navSubjectsBtn = document.getElementById('navSubjectsBtn');
      if (navSubjectsBtn) navSubjectsBtn.addEventListener('click', () => this.switchView('subjects'));

      const navLiveLobbyBtn = document.getElementById('navLiveLobbyBtn');
      if (navLiveLobbyBtn) navLiveLobbyBtn.addEventListener('click', () => this.switchView('liveLobby'));

      // Welcome View CTA buttons
      const welcomeStartBtn = document.getElementById('welcomeStartBtn');
      if (welcomeStartBtn) welcomeStartBtn.addEventListener('click', () => this.switchView('subjects'));

      const welcomeLiveBtn = document.getElementById('welcomeLiveBtn');
      if (welcomeLiveBtn) welcomeLiveBtn.addEventListener('click', () => this.switchView('liveLobby'));

      // Breadcrumb / Back to welcome buttons
      const subjectsBackWelcomeBtn = document.getElementById('subjectsBackWelcomeBtn');
      if (subjectsBackWelcomeBtn) subjectsBackWelcomeBtn.addEventListener('click', () => this.switchView('welcome'));

      const lobbyBackWelcomeBtn = document.getElementById('lobbyBackWelcomeBtn');
      if (lobbyBackWelcomeBtn) lobbyBackWelcomeBtn.addEventListener('click', () => this.switchView('welcome'));

      // Subject Selection Delegation
      const subjectGrid = document.getElementById('subjectGrid');
      if (subjectGrid) {
        subjectGrid.addEventListener('click', (e) => {
          const addBtn = e.target.closest('#openAddSubjectBtn');
          if (addBtn) {
            const modal = document.getElementById('addSubjectModal');
            if (modal) modal.classList.remove('hidden');
            return;
          }
          const card = e.target.closest('.subject-card[data-subject-id]');
          if (!card) return;
          const sId = card.dataset.subjectId;
          if (sId && sId !== State.currentSubjectId) {
            State.currentSubjectId = sId;
            this.renderHome();
            this.checkResumeState();
            const course = this.getCurrentCourse();
            showToast(`Đã chọn môn: ${course ? course.title : sId}!`);
            Sound.shuffle();

            // Gợi ý mã phòng mặc định cho môn này
            const roomInput = document.getElementById('roomIdInput');
            if (roomInput && course) {
              const suggestedCode = (course.code || course.id).replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 8);
              roomInput.value = suggestedCode || 'ROOM';
            }

            // Cuộn mượt xuống khối chi tiết vừa hiển thị
            setTimeout(() => {
              const contentWrap = document.getElementById('subjectContentWrap');
              if (contentWrap) {
                contentWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 80);
          }
        });
      }

      // Add Subject Modal events
      const addModal = document.getElementById('addSubjectModal');
      const closeAddModal = document.getElementById('closeAddSubjectModal');
      const gotItBtn = document.getElementById('gotItBtn');
      const copyTplBtn = document.getElementById('copySubjectTemplateBtn');

      if (closeAddModal && addModal) {
        closeAddModal.addEventListener('click', () => addModal.classList.add('hidden'));
      }
      if (gotItBtn && addModal) {
        gotItBtn.addEventListener('click', () => addModal.classList.add('hidden'));
      }
      if (addModal) {
        addModal.addEventListener('click', (e) => {
          if (e.target === addModal) addModal.classList.add('hidden');
        });
      }
      if (copyTplBtn) {
        copyTplBtn.addEventListener('click', () => {
          const codeEl = document.getElementById('subjectTemplateCode');
          if (codeEl && navigator.clipboard) {
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              showToast('Đã sao chép cấu trúc môn mẫu vào Clipboard!');
            }).catch(() => {
              prompt('Sao chép cấu trúc dưới đây:', codeEl.textContent);
            });
          }
        });
      }

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
      const backHomeBtn = document.getElementById('backHomeBtn');
      if (backHomeBtn) {
        backHomeBtn.addEventListener('click', () => {
          this.checkResumeState();
          this.switchView('welcome');
        });
      }

      // Review filter toggle
      const reviewFilter = document.getElementById('reviewFilter');
      if (reviewFilter) {
        reviewFilter.addEventListener('click', (e) => {
          const btn = e.target.closest('button');
          if (!btn) return;
          reviewFilter.querySelectorAll('button').forEach(b => b.classList.remove('on'));
          btn.classList.add('on');
          State.reviewFilter = btn.dataset.f;
          this.renderReviewList();
        });
      }

      // Live Room Events (nếu có form inline)
      const joinRoomBtn = document.getElementById('joinRoomBtn');
      if (joinRoomBtn) {
        joinRoomBtn.addEventListener('click', () => {
          const nameInput = document.getElementById('userNameInput');
          const roomInput = document.getElementById('roomIdInput');
          const name = (nameInput?.value || '').trim() || 'Bạn ' + Math.floor(Math.random() * 90 + 10);
          const room = (roomInput?.value || '').trim() || 'SHDC';
          if (nameInput) nameInput.value = name;
          LiveRoom.connect(room, name);
        });
      }

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

      // Lựa chọn chế độ thi đấu (Co-op vs Versus)
      const modeSelector = document.getElementById('liveModeSelector');
      if (modeSelector) {
        modeSelector.addEventListener('click', (e) => {
          const btn = e.target.closest('button[data-mode]');
          if (!btn) return;
          modeSelector.querySelectorAll('button').forEach(b => b.classList.remove('on'));
          btn.classList.add('on');
          State.liveModeType = btn.dataset.mode;
          showToast(`Chế độ Live: ${State.liveModeType === 'versus' ? 'Versus (Đấu điểm tốc độ)' : 'Co-op (Học chung)'}`);
        });
      }

      // Lựa chọn thời gian mỗi câu (15s, 30s, 45s)
      const timerSelector = document.getElementById('liveTimerSelector');
      if (timerSelector) {
        timerSelector.addEventListener('click', (e) => {
          const btn = e.target.closest('button[data-timer]');
          if (!btn) return;
          timerSelector.querySelectorAll('button').forEach(b => b.classList.remove('on'));
          btn.classList.add('on');
          State.liveTimerSeconds = parseInt(btn.dataset.timer, 10) || 30;
          showToast(`Thời gian làm bài: ${State.liveTimerSeconds}s / câu`);
        });
      }

      // Nút Micro WebRTC để đàm thoại
      const voiceMicBtn = document.getElementById('voiceMicBtn');
      if (voiceMicBtn) {
        voiceMicBtn.addEventListener('click', () => VoiceChat.toggleMic());
      }

      // Nút Xem bảng xếp hạng trực tiếp
      const showLbBtn = document.getElementById('showLeaderboardBtn');
      if (showLbBtn) {
        showLbBtn.addEventListener('click', () => Leaderboard.show());
      }

      // Nút Bật/Tắt âm thanh
      const topSoundBtn = document.getElementById('soundToggleBtn');
      if (topSoundBtn) topSoundBtn.addEventListener('click', () => Sound.toggleMute());
      const qSoundBtn = document.getElementById('quizSoundBtn');
      if (qSoundBtn) qSoundBtn.addEventListener('click', () => Sound.toggleMute());

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
            FloatingChat.closeWindow();
            Sidebar.toggle(false);
            const lbModal = document.getElementById('liveLeaderboardModal');
            if (lbModal) lbModal.classList.add('hidden');
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
