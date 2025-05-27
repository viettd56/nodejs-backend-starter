# Phân tích Codebase: Node.js Backend Starter

## 1. Cấu trúc thư mục dự án

```
src/
├── cli/                     # Command line interface utilities
├── configs/                 # Cấu hình ứng dụng
│   ├── Database.config.ts   # Cấu hình kết nối database
│   ├── Redis.config.ts      # Cấu hình Redis
│   ├── Server.config.ts     # Cấu hình server
│   └── TokenJWT.config.ts   # Cấu hình JWT token
├── domains/                 # Chứa tất cả modules nghiệp vụ
│   ├── _shared/             # Các module dùng chung
│   │   ├── _sample/         # Module mẫu
│   │   ├── cache/           # Module quản lý cache
│   │   ├── common/          # Utilities dùng chung
│   │   ├── data/            # Xử lý dữ liệu dùng chung
│   │   ├── fastify/         # Cấu hình Fastify
│   │   ├── healthCheck/     # Kiểm tra trạng thái server
│   │   ├── jobQueue/        # Quản lý hàng đợi công việc
│   │   ├── swagger/         # Cấu hình Swagger
│   │   ├── token/           # Xử lý token
│   │   └── user/            # Quản lý người dùng
│   ├── cms/                 # Module CMS (Content Management System)
│   │   ├── cms.router.ts    # Router cho CMS
│   │   └── login/           # Xử lý đăng nhập CMS
│   └── mobile/              # Module Mobile API
│       ├── login/           # Xử lý đăng nhập mobile
│       └── mobile.router.ts # Router cho mobile
├── helpers/                 # Các hàm tiện ích
│   ├── Bcrypt.helper.ts     # Mã hóa mật khẩu
│   ├── Crypto.helper.ts     # Mã hóa/giải mã dữ liệu
│   ├── Exception.helper.ts  # Xử lý ngoại lệ
│   ├── Logger.helper.ts     # Ghi log
│   ├── Other.helper.ts      # Các tiện ích khác
│   └── Validation.helper.ts # Kiểm tra dữ liệu
├── jobs/                    # Xử lý công việc theo lịch
├── main.ts                  # Điểm khởi đầu ứng dụng
├── models/                  # Định nghĩa models
│   ├── data/                # Dữ liệu mẫu/cơ sở
│   └── sequelize.ts         # Cấu hình Sequelize ORM
└── types/                   # Định nghĩa kiểu dữ liệu TypeScript
```

## 2. Công nghệ sử dụng

- **Framework**: Fastify - một web framework hiệu suất cao cho Node.js
- **ORM**: Sequelize - ORM cho các cơ sở dữ liệu SQL
- **Cache**: Redis - hệ thống cache in-memory
- **API Documentation**: Swagger - tự động tạo tài liệu API
- **Mã hóa**: Bcrypt - cho mật khẩu, và crypto module cho mã hóa khác
- **Xác thực**: JWT (JSON Web Tokens)
- **Logging**: Custom logger
- **Testing**: Có các file *.spec.ts cho unit testing (dựa trên cấu trúc)

## 3. Kiến trúc ứng dụng

### 3.1. Mô hình kiến trúc

Ứng dụng được thiết kế theo mô hình kiến trúc module hóa, với các thành phần được tổ chức theo chức năng nghiệp vụ (domain-driven). Mỗi domain chịu trách nhiệm cho một phần cụ thể của ứng dụng.

### 3.2. API Endpoints

Ứng dụng cung cấp các API endpoints thông qua các router:
- `/v1/sample` - API mẫu
- `/v1/cms` - API cho CMS (Content Management System)
- `/v1/mobile` - API cho ứng dụng di động
- `/` - Endpoint kiểm tra sức khỏe server (health check)

### 3.3. Xử lý Authentication

- Xác thực được xử lý thông qua JWT tokens
- Các module login riêng biệt cho CMS và Mobile
- Cấu hình bảo mật JWT trong `TokenJWT.config.ts`

## 4. Các module chính

### 4.1. Domains

#### 4.1.1. _shared
Chứa các module dùng chung giữa các domain khác nhau:
- **_sample**: Module mẫu, có thể được sử dụng làm template để tạo module mới
- **cache**: Quản lý cache sử dụng Redis
- **fastify**: Cấu hình Fastify, xử lý middleware và error handler
- **healthCheck**: Kiểm tra trạng thái server
- **swagger**: Cấu hình và quản lý tài liệu API

#### 4.1.2. CMS Domain
- Quản lý các API cho hệ thống quản trị nội dung
- Module login riêng biệt để xử lý xác thực
- Đã có sự thay đổi từ 'sample' sang 'workspace' trong module này (theo thông tin lưu trữ)

#### 4.1.3. Mobile Domain
- Quản lý các API cho ứng dụng di động
- Module login riêng biệt để xử lý xác thực

### 4.2. Helpers

Các tiện ích được sử dụng xuyên suốt ứng dụng:
- **Bcrypt.helper**: Mã hóa và so sánh mật khẩu
- **Crypto.helper**: Mã hóa/giải mã dữ liệu
- **Exception.helper**: Xử lý ngoại lệ và lỗi
- **Logger.helper**: Ghi log
- **Other.helper**: Các tiện ích phổ biến
- **Validation.helper**: Kiểm tra dữ liệu đầu vào

### 4.3. Configs

Các cấu hình cho ứng dụng:
- **Database.config**: Cấu hình kết nối database
- **Redis.config**: Cấu hình Redis
- **Server.config**: Cấu hình server (port, swagger, etc.)
- **TokenJWT.config**: Cấu hình JWT token

## 5. Luồng hoạt động

1. Ứng dụng bắt đầu từ `main.ts`, nơi khởi tạo server Fastify
2. Các middleware và error handler được thiết lập
3. Các routes được đăng ký với các prefix tương ứng
4. Server lắng nghe trên port 3000
5. Các requests được định tuyến đến các router tương ứng
6. Middleware xác thực kiểm tra token nếu cần
7. Service xử lý logic nghiệp vụ và tương tác với database
8. Kết quả được trả về client

## 6. Lưu ý

1. Dự án sử dụng mô hình tổ chức code theo kiểu module, mỗi module có thể bao gồm các file:
   - `*.router.ts`: Định nghĩa các API endpoints
   - `*.service.ts`: Xử lý logic nghiệp vụ
   - `*.middleware.ts`: Middleware xử lý trước/sau request
   - `*.service.spec.ts`: Unit tests

2. Theo thông tin đã lưu trữ, một số file đã được đổi tên từ 'sample' sang 'workspace' trong thư mục `src/domains/cms/workspace`, tuy nhiên thư mục này không hiển thị trong cấu trúc hiện tại.

3. Swagger được sử dụng để tạo tài liệu API tự động, có thể truy cập tại `http://localhost:3000/documentation` khi server đang chạy và `SHOW_SWAGGER` được bật trong cấu hình.