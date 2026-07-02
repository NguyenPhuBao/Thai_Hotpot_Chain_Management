# 🍲 Lẩu Thái - Hệ thống Quản lý Chuỗi Nhà hàng

> **Stack:** Node.js + Express + Sequelize + MySQL + EJS + jQuery  
> **Database:** `lau_thai` (MySQL) | **Port:** `5253`

---

## 📋 Mục lục

- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt & Chạy](#cài-đặt--chạy)
- [Tài khoản mặc định](#tài-khoản-mặc-định)
- [Phân quyền theo Actor](#phân-quyền-theo-actor)
- [Quy trình nghiệp vụ](#quy-trình-nghiệp-vụ)
- [Cấu trúc dự án](#cấu-trúc-dự-án)

---

## Yêu cầu hệ thống

- **Node.js** phiên bản 14.x hoặc cao hơn
- **MySQL** phiên bản 5.7 hoặc cao hơn
- **Git**

---

## Cài đặt & Chạy

```bash
# 1. Clone repository
git clone https://github.com/vdtien2908/restaurant-chain-21082024.git
cd restaurant-chain-21082024

# 2. Tạo file .env từ mẫu
cp .env-example .env
# Cập nhật thông tin DB trong .env:
#   DB_HOST=localhost
#   DB_DATABASE=lau_thai
#   DB_USERNAME=root
#   DB_PASSWORD=123456

# 3. Tạo database (MySQL Workbench hoặc CLI)
# CREATE DATABASE lau_thai;

# 4. Cài đặt dependencies
npm install

# 5. Chạy migration & seeder
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# 6. Khởi động server (development)
npm run dev
```

> 🌐 Truy cập: **http://localhost:5253**

---

## Tài khoản mặc định

| Vai trò | Email | Mật khẩu | Giao diện đăng nhập |
|---------|-------|----------|---------------------|
| 🔑 Admin ROOT | `quantrivien@food.com` | `123456` | `/admin/login` |
| 👔 Cửa hàng trưởng | `quanly@food.com` | `123456` | `/admin/login` |
| 👨‍🍳 Nhân viên | `nhanvien@food.com` | `123456` | `/admin/login` |
| 🧑 Khách hàng | `khachhang@food.com` | `123456` | `/login` |

---

## Phân quyền theo Actor

| Chức năng | 🔑 Admin ROOT | 👔 Cửa hàng trưởng | 👨‍🍳 Nhân viên | 🧑 Khách hàng |
|-----------|:--:|:--:|:--:|:--:|
| **Đăng nhập** | ✅ | ✅ | ✅ | ✅ |
| **Dashboard / Thống kê doanh thu** | ✅ | ✅ | ❌ | ❌ |
| | | | | |
| **Quản lý bàn ăn** *(đặt món, sửa đơn, xóa đơn)* | ✅ | ✅ | ✅ | ❌ |
| **Thanh toán hóa đơn** | ✅ | ✅ | ✅ | ❌ |
| **Xem hóa đơn bán hàng** | ✅ | ✅ | ✅ | ❌ |
| **Quản lý đặt bàn** *(phê duyệt, từ chối, chuyển CN)* | ✅ | ✅ | ✅ | ❌ |
| | | | | |
| **Quản lý danh sách bàn ăn** *(CRUD bàn)* | ✅ | ❌ | ❌ | ❌ |
| **Quản lý chi nhánh** *(CRUD)* | ✅ | ❌ | ❌ | ❌ |
| **Quản lý món ăn** *(CRUD)* | ✅ | ❌ | ❌ | ❌ |
| **Quản lý danh mục** *(CRUD)* | ✅ | ❌ | ❌ | ❌ |
| **Quản lý khuyến mãi** *(CRUD voucher)* | ✅ | ❌ | ❌ | ❌ |
| **Quản lý cửa hàng trưởng** *(CRUD)* | ✅ | ❌ | ❌ | ❌ |
| | | | | |
| **Quản lý khách hàng** *(CRUD + lịch sử GD)* | ✅ | ✅ | ❌ | ❌ |
| **Quản lý nhân viên** *(CRUD)* | ✅ | ✅ | ❌ | ❌ |
| | | | | |
| **Đặt bàn trực tuyến** | ❌ | ❌ | ❌ | ✅ |
| **Xem lịch sử đặt bàn** | ❌ | ❌ | ❌ | ✅ |
| **Xem điểm tích lũy** | ❌ | ❌ | ❌ | ✅ |
| **Xem lịch sử hóa đơn cá nhân** | ❌ | ❌ | ❌ | ✅ |

> ✅ = Có quyền | ❌ = Không có quyền hoặc không áp dụng

---

## Quy trình nghiệp vụ

### 1. 🪑 Quy trình Đặt bàn *(Khách hàng)*

```
Khách hàng → Đăng nhập → Chọn "Đặt bàn" → Chọn CN + số người + ngày + giờ
→ Hệ thống hiển thị bàn trống → Xác nhận đặt → Email xác nhận gửi cho khách
```

### 2. 🍲 Quy trình Đặt món *(Nhân viên tại nhà hàng)*

```
Nhân viên → Đăng nhập Admin → "Quản lý bàn ăn" → Chọn bàn
→ Chọn món từ menu → Hệ thống tự động tính tổng tiền
→ Khách gọi thêm: +/- món hoặc xóa món khỏi đơn
```

### 3. 💳 Quy trình Thanh toán *(Nhân viên tại nhà hàng)*

```
Nhân viên → "Thanh toán" → Nhập SĐT khách + chọn phương thức TT
→ Áp mã giảm giá (nếu có) → Đổi điểm tích lũy (nếu có)
→ Xác nhận thanh toán
→ Hệ thống: Tích điểm + Gửi ZNS Zalo + Bàn về trống
```

### Quy tắc tích điểm

| Hành động | Công thức |
|-----------|----------|
| Tích điểm | Mỗi giao dịch thành công → +10 điểm |
| Đổi điểm | 1 điểm = 1.000₫, trừ vào tổng tiền |
| Hạn điểm | 12 tháng kể từ lần tích gần nhất |

---

## Cấu trúc dự án

```
src/
├── index.js                    # Entry point Express
├── configs/                    # Session, Routes, DB config
├── app/
│   ├── models/                 # 12 Sequelize Models
│   └── http/
│       ├── controllers/        # admins/ (14) + customers/ (3)
│       └── middlewares/        # Auth, PassLocals, CheckStore
├── database/
│   ├── migrations/             # 13 migration files
│   └── seeders/                # 6 seeder files
├── routes/
│   ├── admins/                 # 12 route files
│   └── customers/              # 2 route files
├── resources/views/            # EJS templates
├── public/                     # Static assets (CSS, JS, images)
└── utils/                      # sendEmail, sendZNS, getCurrentDate
```

### Cơ sở dữ liệu (13 bảng)

| # | Bảng | Mô tả |
|---|------|-------|
| 1 | `roles` | Phân quyền (Admin, QL, NV, KH) |
| 2 | `pointmembers` | Thành viên tích điểm |
| 3 | `users` | Người dùng hệ thống |
| 4 | `stores` | Chi nhánh / Cửa hàng |
| 5 | `tables` | Bàn ăn |
| 6 | `categories` | Danh mục món ăn |
| 7 | `typeoffoods` | Loại món (chính, phụ, khai vị...) |
| 8 | `vouchers` | Mã khuyến mãi |
| 9 | `products` | Món ăn |
| 10 | `orders` | Đơn hàng |
| 11 | `orderdetails` | Chi tiết đơn hàng |
| 12 | `belongstores` | Nhân viên ∈ Chi nhánh (N-N) |
| 13 | `books` | Đặt bàn trực tuyến |

---

## Công nghệ sử dụng

| Công nghệ | Mục đích |
|-----------|----------|
| **Express.js** | Web framework |
| **Sequelize** | ORM cho MySQL |
| **EJS** | Template engine (Server-side rendering) |
| **jQuery + AJAX** | Dynamic page updates |
| **Nodemailer** | Gửi email xác nhận đặt bàn |
| **Zalo ZNS API** | Thông báo hóa đơn + điểm tích lũy |
| **VietQR** | Mã QR thanh toán |
| **Chart.js** | Biểu đồ doanh thu Dashboard |

---

> 📌 **Ghi chú:** Dự án gốc tên "Chay Xanh" đã được chuyển đổi sang thương hiệu "Lẩu Thái". Cấu trúc CSDL và logic backend giữ nguyên, chỉ thay đổi giao diện và dữ liệu seed.

