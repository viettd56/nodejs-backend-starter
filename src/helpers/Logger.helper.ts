import pino from 'pino';
// Tạo logger với cấu hình mặc định
const logger = pino({
    level: 'info', // Cấp độ log
    transport: {
        target: 'pino-pretty', // Để có định dạng dễ đọc
        options: {
            // colorize: true, // Màu sắc cho console
        },
    },
});

const overrideConsoleLog = () => {
    // Override console.log
    console.log = (...args) => {
        let fullString = true;
        for (const arg of args) {
            if (typeof arg !== 'string') {
                fullString = false;
                break;
            }
        }
        if (fullString) {
            logger.info(args.join(' ')); // Log with info level
        } else {
            for (const arg of args) {
                logger.info(arg); // Log with info level
            }
        }
    };

    console.error = (...args) => {
        let fullString = true;
        for (const arg of args) {
            if (typeof arg !== 'string') {
                fullString = false;
                break;
            }
        }
        if (fullString) {
            logger.error(args.join(' ')); // Log with info level
        } else {
            for (const arg of args) {
                logger.error(arg); // Log with info level
            }
        }
    };
};

export { logger, overrideConsoleLog };
