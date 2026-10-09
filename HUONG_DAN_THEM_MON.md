# 📚 HƯỚNG DẪN THÊM MÔN HỌC & ĐỀ THI MỚI (MULTI-SUBJECT GUIDE)

Hệ thống Quiz đã được cấu trúc lại hoàn toàn theo kiến trúc **Đa môn học / Đa chủ đề (Multi-subject / Multi-topic)**. Bạn có thể thêm không giới hạn các môn học khác nhau (Hóa học, Toán, Lý, Pháp luật đại cương, Triết học...) mà không làm ảnh hưởng đến dữ liệu của môn Sinh học A1.

---

## 🗂️ 1. Cấu trúc dữ liệu của một Môn học (Subject Schema)

Tất cả các môn học được lưu trong file `data.js` bên trong mảng `window.COURSES_DATA`. Mỗi môn học là một đối tượng có cấu trúc chuẩn như sau:

| Thuộc tính | Kiểu dữ liệu | Ý nghĩa | Ví dụ |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Định danh duy nhất của môn (không dấu, cách nhau bằng gạch nối) | `"sinh-hoc-a1"`, `"hoa-phan-tich"`, `"toan-a1"` |
| `title` | `string` | Tên hiển thị của môn học | `"Sinh học A1"`, `"Hóa phân tích đại cương"` |
| `description` | `string` | Mô tả ngắn về môn học / đề thi | `"Đề cương ôn tập trắc nghiệm giữa kỳ"` |
| `icon` | `string` | Tên icon Material Symbols | `"biotech"`, `"science"`, `"calculate"`, `"gavel"`, `"psychology"` |
| `color` | `string` | Màu chủ đạo của môn (tùy chọn) | `"#34a853"` (Xanh lá), `"#4285f4"` (Xanh dương), `"#ea4335"` (Đỏ) |
| `chapters` | `array` | Danh sách các chương / phần thi của môn đó | Xem cấu trúc chương bên dưới |

### Cấu trúc một Chương (`chapter`):
Mỗi chương trong `chapters` chứa danh sách câu hỏi:
```javascript
{
  id: "c1", // Mã chương (duy nhất trong môn)
  title: "Chương 1: Đại cương về tế bào", // Tên đầy đủ của chương
  short: "Tế bào", // Tên ngắn gọn (hiển thị trên thẻ)
  questions: [
    {
      n: 1, // Số thứ tự câu hỏi
      q: "Nội dung câu hỏi trắc nghiệm là gì?", // Câu hỏi (hỗ trợ cả thẻ HTML như <sub>, <sup>)
      o: [
        "Đáp án A",
        "Đáp án B",
        "Đáp án C",
        "Đáp án D"
      ],
      a: 0, // Chỉ số đáp án ĐÚNG (0=A, 1=B, 2=C, 3=D)
      exp: "Giải thích chi tiết tại sao đáp án A đúng và các đáp án khác sai."
    }
  ]
}
```

---

## ✍️ 2. Các bước thêm một môn học mới

### Bước 1: Mở file `data.js`
Mở file `data.js` bằng trình soạn thảo code (VS Code, Notepad...).

### Bước 2: Thêm môn học vào mảng `window.COURSES_DATA`
Kéo xuống phía dưới mảng `window.COURSES_DATA`, thêm dấu phẩy `,` và dán cấu trúc môn mới của bạn vào:

```javascript
  , {
    id: "hoa-dai-cuong",
    title: "Hóa học đại cương",
    description: "Đề cương ôn tập trắc nghiệm Hóa học đại cương A1",
    icon: "science",
    color: "#4285f4",
    chapters: [
      {
        id: "hdc_c1",
        title: "Chương 1: Cấu tạo nguyên tử & Bảng tuần hoàn",
        short: "Cấu tạo nguyên tử",
        questions: [
          {
            n: 1,
            q: "Hạt mang điện tích âm trong nguyên tử là:",
            o: ["Proton", "Neutron", "Electron", "Positron"],
            a: 2,
            exp: "Electron mang điện tích âm (-1), proton mang điện (+1), neutron không mang điện."
          }
        ]
      }
    ]
  }
```

### Bước 3: Đưa lên Render để cập nhật tự động
Sau khi lưu file `data.js`:
* Chỉ cần nhấp đúp chuột vào file **`day-len-github.bat`**.
* Render sẽ tự động lấy code mới và trang web **`https://aurabakhi.onrender.com`** sẽ hiển thị môn mới cho bạn và cả lớp cùng học ngay lập tức!

---

## 💡 Gợi ý một số Icon Material Symbols đẹp cho môn học:
- Sinh học / Y sinh: `biotech`, `eco`, `spa`, `coronavirus`
- Hóa học / Thí nghiệm: `science`, `experiment`, `medication`
- Toán học / Thống kê: `calculate`, `functions`, `percent`
- Tin học / Lập trình: `terminal`, `code`, `laptop_chromebook`
- Luật / Pháp luật: `gavel`, `policy`, `balance`
- Kinh tế / Tài chính: `payments`, `account_balance`, `trending_up`
- Ngoại ngữ / Tiếng Anh: `translate`, `language`, `chat`
