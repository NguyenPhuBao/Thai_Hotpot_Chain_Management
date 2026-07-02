# 🗺️ ROADMAP — KẾ HOẠCH PHÁT TRIỂN LẨU THÁI

> **Ngày cập nhật:** 2026-07-02  
> **Phiên bản hiện tại:** v0.85  
> **Trạng thái:** Có thể demo & sử dụng thực tế cơ bản

---

## 📊 TỔNG QUAN

| Giai đoạn | Mục tiêu | Thời gian ước tính | Trạng thái |
|-----------|----------|-------------------|:----------:|
| **Phase 1** | Sửa lỗi & hoàn thiện tính năng cốt lõi | 1-2 tuần | 🟡 Đang làm |
| **Phase 2** | Bổ sung tính năng theo SRS | 2-3 tuần | ⬜ Chưa làm |
| **Phase 3** | Nâng cao trải nghiệm & bảo mật | 2-3 tuần | ⬜ Chưa làm |
| **Phase 4** | Tối ưu & triển khai production | 1-2 tuần | ⬜ Chưa làm |

---

## 🔴 PHASE 1 — SỬA LỖI & HOÀN THIỆN CỐT LÕI

> **Mục tiêu:** Hệ thống chạy ổn định, không crash, đủ dữ liệu demo

### 1.1 Đã hoàn thành ✅

| # | Hạng mục | Ngày | Ghi chú |
|---|----------|------|---------|
| ✅ | Fix L1: Nhân viên không có belongStore → crash server | 02/07/2026 | Thêm null check trong `AuthController.choiceStore` |
| ✅ | Fix L2: Profile khách hàng lỗi 500 | 02/07/2026 | Handle null `pointMember` trong controller + template |
| ✅ | Fix L3: Validator is not defined → Dashboard trống | 02/07/2026 | Load `validator.js` trong `main-layout.ejs` |
| ✅ | Fix L4: Books hiển thị 0 bản ghi | 02/07/2026 | Handle null `user` + `pointMember` trong `BookController` |
| ✅ | Bổ sung dữ liệu test gấp 3 lần | 02/07/2026 | Vouchers: 12, Books: 18, Orders: 15, OrderDetails: 66 |
| ✅ | Cập nhật README.md | 02/07/2026 | Phân quyền Actor, quy trình nghiệp vụ, hướng dẫn cài đặt |

### 1.2 Cần hoàn thiện

| # | Hạng mục | Ưu tiên | Mô tả |
|---|----------|:------:|-------|
| P1-01 | **Xử lý lỗi toàn diện** | 🔴 Cao | Wrap tất cả controller method với try-catch + error handler middleware tập trung |
| P1-02 | **Validator password change** | 🟡 TB | Thêm `validator.js` vào `empty-layout.ejs` nếu form đổi mật khẩu dùng layout này |
| P1-03 | **Kiểm tra tất cả null reference** | 🟡 TB | Audit toàn bộ code: `user.pointMember.xxx`, `belongsTo.storeId`, `bookData.user.xxx` |
| P1-04 | **Kiểm tra session timeout** | 🟢 Thấp | Cấu hình `express-session` cookie maxAge, xử lý session hết hạn graceful |

---

## 🟡 PHASE 2 — BỔ SUNG TÍNH NĂNG THEO SRS

> **Mục tiêu:** Đạt 100% độ phủ Use Case theo tài liệu SRS `SOMS_ChayXanh_Report`

### 2.1 Tính năng còn thiếu (theo SRS)

| # | Use Case | SRS | Ưu tiên | Mô tả chi tiết |
|---|----------|:---:|:------:|---------------|
| **P2-01** | **Tìm kiếm món ăn (Customer)** | UC-05 | 🔴 Cao | Backend API search món ăn theo tên, danh mục, loại món. Hiện tại chỉ có UI search trên trang chủ nhưng không có API xử lý |
| | | | | **Cần làm:** |
| | | | | - Tạo API `GET /api/products/search?q=&categoryId=&typeOfFoodId=` |
| | | | | - Thêm route `GET /search` cho trang kết quả |
| | | | | - View hiển thị kết quả dạng grid |
| **P2-02** | **Tích điểm theo tỉ lệ thực tế** | BR-7 | 🔴 Cao | SRS quy định: "10.000đ = 1 điểm". Hiện tại hệ thống tích cố định +10 điểm/đơn hàng, chưa tính theo tổng tiền |
| | | | | **Cần làm:** |
| | | | | - Sửa `OrderController.confirmOrderPayment`: `points = Math.floor(totalPrice / 10000)` |
| | | | | - Cập nhật logic: `newValue = oldValue - exchangePoints + earnedPoints` |
| | | | | - Hiển thị số điểm được tích trong form checkout |
| **P2-03** | **Nhân đôi điểm dịp lễ / KM** | BR-9 | 🟡 TB | SRS quy định: "Một số chương trình giảm giá đặc biệt có thể cho phép khách hàng tích lũy điểm cao hơn (nhân đôi điểm trong dịp lễ)" |
| | | | | **Cần làm:** |
| | | | | - Thêm field `pointMultiplier` vào bảng `vouchers` |
| | | | | - Khi checkout: `points × multiplier` nếu có voucher đặc biệt |
| **P2-04** | **Báo cáo doanh thu tự động** | UC-26 | 🟡 TB | SRS: "Báo cáo doanh thu tự động theo lịch hàng ngày, tuần và tháng, với thông tin chi tiết về món ăn bán chạy, doanh thu theo giờ cao điểm, và tổng doanh thu theo chi nhánh" |
| | | | | **Cần làm:** |
| | | | | - Bổ sung filter: hôm nay / 7 ngày / 30 ngày / custom range |
| | | | | - Thêm biểu đồ: top món bán chạy, doanh thu theo chi nhánh |
| | | | | - Option xuất báo cáo PDF/Excel |
| | | | | - Báo cáo giao dịch bị hủy riêng biệt |
| **P2-05** | **VietQR động (API ngân hàng)** | M2 | 🟡 TB | Hiện tại QR hiển thị tĩnh trong template `checkout.ejs`. Cần gọi API VietQR thực để tạo mã QR động với số tiền thực tế |
| | | | | **Cần làm:** |
| | | | | - Tích hợp API VietQR (VietQR.io hoặc NAPAS) |
| | | | | - Tạo QR code động: số TK + tên + số tiền + nội dung |
| | | | | - Polling kiểm tra trạng thái thanh toán (webhook hoặc polling) |

### 2.2 Tính năng SRS đã có nhưng cần cải thiện

| # | Hạng mục | Mô tả |
|---|----------|-------|
| P2-06 | **Quên mật khẩu OTP qua Zalo** | SRS mô tả gửi OTP qua Zalo để xác thực. Hiện tại chỉ gửi email. Cần thêm option gửi OTP qua Zalo ZNS |
| P2-07 | **Đặt bàn: tự động gợi ý khung giờ** | Khi hết bàn, hệ thống nên gợi ý các khung giờ lân cận còn bàn trống |
| P2-08 | **Đặt bàn: chọn bàn cụ thể** | Hiện tại chỉ chọn chi nhánh. Nên cho phép khách chọn bàn cụ thể (theo loại: Thường/VIP/Phòng riêng) |

---

## 🔵 PHASE 3 — NÂNG CAO TRẢI NGHIỆM & BẢO MẬT

> **Mục tiêu:** Hệ thống chuyên nghiệp, an toàn, UX tốt

### 3.1 Giao diện khách hàng

| # | Hạng mục | Ưu tiên | Mô tả |
|---|----------|:------:|-------|
| P3-01 | **Làm mới template khách hàng** | 🟡 TB | Template hiện tại dùng theme Delfood cũ, nhiều nội dung Lorem Ipsum, tiếng Anh. Cần Việt hóa & tùy chỉnh cho nhà hàng lẩu |
| P3-02 | **Hiển thị thực đơn đầy đủ** | 🟡 TB | Trang chủ nên hiển thị danh sách món ăn theo danh mục (dạng menu nhà hàng) |
| P3-03 | **Trang chi tiết món ăn** | 🟢 Thấp | Mỗi món ăn có trang riêng: ảnh lớn, mô tả, giá, món liên quan |
| P3-04 | **Responsive mobile tối ưu** | 🟡 TB | Kiểm tra & fix responsive trên mobile cho cả admin & customer |

### 3.2 Bảo mật

| # | Hạng mục | Ưu tiên | Mô tả |
|---|----------|:------:|-------|
| P3-05 | **CSRF Protection** | 🔴 Cao | Thêm middleware `csurf` hoặc token-based CSRF protection cho tất cả form POST |
| P3-06 | **XSS Protection** | 🔴 Cao | Sanitize input, set Content-Security-Policy header, escape output trong EJS |
| P3-07 | **Rate Limiting** | 🟡 TB | Giới hạn request/login để chống brute force: `express-rate-limit` |
| P3-08 | **Input Validation** | 🟡 TB | Validate tất cả input với Joi hoặc express-validator |
| P3-09 | **File upload security** | 🟡 TB | Giới hạn loại file ảnh, kích thước, scan malware |
| P3-10 | **HTTPS** | 🔴 Cao | Bắt buộc khi deploy production (Let's Encrypt) |

### 3.3 Trải nghiệm người dùng

| # | Hạng mục | Mô tả |
|---|----------|-------|
| P3-11 | **Loading states** | Thêm skeleton/spinner khi load dữ liệu AJAX |
| P3-12 | **Phân trang (Pagination)** | Các bảng danh sách hiện tại load toàn bộ. Cần phân trang + limit |
| P3-13 | **Thông báo real-time** | WebSocket/Socket.io để thông báo đặt bàn mới, đơn hàng mới cho admin |
| P3-14 | **In hóa đơn** | Chức năng in hóa đơn trực tiếp từ trang checkout |
| P3-15 | **Dark mode** | Hỗ trợ giao diện tối cho admin panel |

---

## 🟢 PHASE 4 — TỐI ƯU & TRIỂN KHAI PRODUCTION

> **Mục tiêu:** Sẵn sàng deploy lên môi trường thực tế

### 4.1 Kỹ thuật

| # | Hạng mục | Mô tả |
|---|----------|-------|
| P4-01 | **Chuẩn hóa ES Module** | Thống nhất dùng `import/export` hoặc `require/module.exports`. Thêm `"type": "module"` vào `package.json` hoặc convert hết về CommonJS |
| P4-02 | **CI/CD Pipeline** | GitHub Actions: lint → test → build → deploy |
| P4-03 | **Unit Test** | Viết test cho controllers, models với Jest/Mocha |
| P4-04 | **E2E Test** | Playwright/Cypress test các luồng chính: đặt bàn → đặt món → thanh toán |
| P4-05 | **Database Backup** | Script backup MySQL tự động hàng ngày |
| P4-06 | **Logging & Monitoring** | Winston/Pino cho logging, PM2 cho process management |
| P4-07 | **Docker** | Dockerfile + docker-compose.yml (Node.js + MySQL) |

### 4.2 Triển khai

| # | Hạng mục | Mô tả |
|---|----------|-------|
| P4-08 | **Deploy lên Cloud** | Phương án 1: Alwaysdata.com (miễn phí, Node.js + MySQL). Phương án 2: Render.com + Aiven MySQL. Phương án 3: Cloudflare Tunnel + máy on-premise |
| P4-09 | **CI/CD deployment** | Auto-deploy khi push lên branch `main` |
| P4-10 | **Custom domain** | Cấu hình domain riêng + SSL |
| P4-11 | **Performance optimization** | Nén ảnh, minify CSS/JS, cache static assets, CDN |

---

## 📋 DANH SÁCH ĐẦY ĐỦ CÁC TASK

| ID | Task | Phase | Ưu tiên | Trạng thái |
|----|------|:-----:|:------:|:----------:|
| P1-01 | Xử lý lỗi toàn diện | 1 | 🔴 | ⬜ Todo |
| P1-02 | Validator cho empty-layout | 1 | 🟡 | ⬜ Todo |
| P1-03 | Audit null reference | 1 | 🟡 | ⬜ Todo |
| P1-04 | Session timeout | 1 | 🟢 | ⬜ Todo |
| P2-01 | Tìm kiếm món ăn (Customer) | 2 | 🔴 | ⬜ Todo |
| P2-02 | Tích điểm theo tỉ lệ | 2 | 🔴 | ⬜ Todo |
| P2-03 | Nhân đôi điểm dịp lễ | 2 | 🟡 | ⬜ Todo |
| P2-04 | Báo cáo doanh thu tự động | 2 | 🟡 | ⬜ Todo |
| P2-05 | VietQR động | 2 | 🟡 | ⬜ Todo |
| P2-06 | OTP qua Zalo cho quên mật khẩu | 2 | 🟡 | ⬜ Todo |
| P2-07 | Gợi ý khung giờ đặt bàn | 2 | 🟢 | ⬜ Todo |
| P2-08 | Chọn bàn cụ thể khi đặt | 2 | 🟢 | ⬜ Todo |
| P3-01 | Làm mới template KH | 3 | 🟡 | ⬜ Todo |
| P3-02 | Hiển thị thực đơn trang chủ | 3 | 🟡 | ⬜ Todo |
| P3-03 | Trang chi tiết món ăn | 3 | 🟢 | ⬜ Todo |
| P3-04 | Responsive mobile | 3 | 🟡 | ⬜ Todo |
| P3-05 | CSRF Protection | 3 | 🔴 | ⬜ Todo |
| P3-06 | XSS Protection | 3 | 🔴 | ⬜ Todo |
| P3-07 | Rate Limiting | 3 | 🟡 | ⬜ Todo |
| P3-08 | Input Validation | 3 | 🟡 | ⬜ Todo |
| P3-09 | File upload security | 3 | 🟡 | ⬜ Todo |
| P3-10 | HTTPS | 3 | 🔴 | ⬜ Todo |
| P3-11 | Loading states | 3 | 🟢 | ⬜ Todo |
| P3-12 | Phân trang | 3 | 🟡 | ⬜ Todo |
| P3-13 | Real-time notification | 3 | 🟢 | ⬜ Todo |
| P3-14 | In hóa đơn | 3 | 🟢 | ⬜ Todo |
| P3-15 | Dark mode | 3 | 🟢 | ⬜ Todo |
| P4-01 | Chuẩn hóa ES Module | 4 | 🟡 | ⬜ Todo |
| P4-02 | CI/CD Pipeline | 4 | 🟡 | ⬜ Todo |
| P4-03 | Unit Test | 4 | 🟡 | ⬜ Todo |
| P4-04 | E2E Test | 4 | 🟡 | ⬜ Todo |
| P4-05 | Database Backup | 4 | 🟡 | ⬜ Todo |
| P4-06 | Logging & Monitoring | 4 | 🟡 | ⬜ Todo |
| P4-07 | Docker | 4 | 🟡 | ⬜ Todo |
| P4-08 | Deploy lên Cloud | 4 | 🔴 | ⬜ Todo |
| P4-09 | CI/CD deployment | 4 | 🟡 | ⬜ Todo |
| P4-10 | Custom domain + SSL | 4 | 🔴 | ⬜ Todo |
| P4-11 | Performance optimization | 4 | 🟢 | ⬜ Todo |

> **Tổng: 37 tasks** | 🔴 Cao: 10 | 🟡 Trung bình: 19 | 🟢 Thấp: 8

---

## 🎯 MỤC TIÊU NGẮN HẠN (2 tuần tới)

1. ✅ ~~Fix 4 bugs crash/500~~ → **Done**
2. P2-01: Tìm kiếm món ăn cho khách hàng
3. P2-02: Tích điểm theo tỉ lệ thực tế (10.000đ = 1đ)
4. P1-03: Audit & fix tất cả null reference

## 🎯 MỤC TIÊU TRUNG HẠN (1-2 tháng)

1. P2-04: Báo cáo doanh thu hoàn chỉnh
2. P2-05: VietQR động
3. P3-05, P3-06, P3-07: Bảo mật cơ bản
4. P4-08: Deploy lên cloud (Alwaysdata)

## 🎯 MỤC TIÊU DÀI HẠN (3-6 tháng)

1. P3-01: Làm mới giao diện khách hàng
2. P4-01 đến P4-07: Chuẩn hóa code, test, Docker, monitoring
3. P3-13: Real-time notification
4. P4-09: CI/CD tự động

---

> 📌 **Liên hệ:** File SRS gốc `SOMS_ChayXanh_Report.docx` nằm ở thư mục gốc dự án.
