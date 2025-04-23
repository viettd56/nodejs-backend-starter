import pino from 'pino';
// Tạo logger với cấu hình mặc định
export const logger = pino({
    level: 'info', // Cấp độ log
    transport: {
        target: 'pino-pretty', // Để có định dạng dễ đọc
        options: {
            colorize: true, // Màu sắc cho console
        },
    },
});
