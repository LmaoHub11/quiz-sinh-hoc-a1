# 🧬 QUIZ SINH HỌC A1 - ĐẠI HỌC CẦN THƠ

Ứng dụng web ôn tập trắc nghiệm Sinh học đại cương A1 theo phong cách giao diện **NotebookLM** hiện đại, tích hợp **giải thích chi tiết từng câu** và tính năng **Phòng học nhóm trực tiếp (Live Co-op) 10 người** với độ trễ siêu thấp qua WebSocket.

---

## ✨ Tính năng nổi bật

1. **Bộ câu hỏi đầy đủ**:
   - Gồm **250 câu trắc nghiệm** trải rộng 4 chương (Chương 1: 50 câu, Chương 2: 50 câu, Chương 3: 50 câu, Chương 4: 100 câu).
   - Đầy đủ đáp án chuẩn và **phần giải thích chi tiết** lý do đúng/sai theo giáo trình Campbell Biology.
2. **Giao diện NotebookLM thân thiện**:
   - Clean, tinh gọn, font Inter, màu sắc trực quan, hỗ trợ Dark Mode / Light Mode.
   - Thống kê kết quả trực quan dạng vòng tròn tiến độ và xem lại toàn bộ bài làm.
3. **Chế độ phòng học Live 10 người**:
   - Khi một bạn chọn đáp án, các máy khác trong phòng được đồng bộ chọn theo ngay lập tức.
   - Đồng bộ chuyển câu hỏi, xáo trộn câu và đáp án.
   - Live Chat & thả cảm xúc bay lên màn hình thời gian thực.
   - **Cơ chế chống mất kết nối (Auto-reconnect)**: Giữ chỗ 90s khi đổi tab/khóa màn hình điện thoại, tự động kết nối lại khi quay lại. Tự động kick nếu rời quá 90 giây.
4. **Chia sẻ kết nối toàn cầu không cần địa chỉ IP**:
   - Tích hợp **Cloudflare Tunnel**: Tự động tạo link HTTPS công khai (ví dụ: `https://xxxx.trycloudflare.com`) để bạn bè dùng 4G, 5G hoặc mạng Wi-Fi khác truy cập mà không cần mở port hay biết địa chỉ IP máy chủ.

---

## 🚀 Hướng dẫn cài đặt và khởi chạy

### Yêu cầu
- Đã cài đặt [Node.js](https://nodejs.org/) (phiên bản 18+).

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Khởi chạy Server
Nhấp đúp chuột vào file `chay-server.bat` trên Windows, hoặc chạy lệnh:
```bash
npm start
```

Sau khi chạy:
- **Trên máy chủ:** Truy cập `http://localhost:3000`
- **Mạng nội bộ Wi-Fi:** Truy cập địa chỉ IP máy chủ (ví dụ: `http://192.168.1.x:3000`)
- **Toàn cầu (không cần IP):** Server sẽ tự tạo link `https://xxx.trycloudflare.com` hiển thị trực tiếp trên cửa sổ dòng lệnh để bạn gửi cho bạn bè.

---

## 🌐 Triển khai lên Cloud (Render / Railway / Glitch)

Nếu muốn server chạy online 24/7 mà không cần mở máy tính cá nhân:

1. Đưa mã nguồn lên **GitHub** (xem hướng dẫn bên dưới).
2. Đăng ký tài khoản miễn phí tại [Render.com](https://render.com/).
3. Chọn **New Web Service** -> Kết nối với kho lưu trữ GitHub của bạn.
4. Cấu hình:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Bấm **Deploy**! Render sẽ cấp cho bạn một domain HTTPS miễn phí để học nhóm bất cứ lúc nào.

---

## 🛠 Cấu trúc thư mục

```
Quiz SHDC/
├── index.html        # Giao diện chính của ứng dụng
├── style.css         # Toàn bộ CSS phong cách NotebookLM
├── app.js            # Logic giao diện, âm thanh, WebSockets
├── data.js           # Dữ liệu 250 câu hỏi & lời giải chi tiết
├── server.js         # HTTP Server & WebSocket Server (10 người)
├── chay-server.bat   # Phím tắt khởi động server 1-click trên Windows
├── package.json      # Khai báo thư viện & cấu hình dự án
└── README.md         # Hướng dẫn sử dụng
```

---

*Chúc các bạn học tốt và đạt điểm cao trong học phần Sinh học A1!* 🎓
