import pino from 'pino';
const dest = pino.destination({ sync: false });

const appLogger = pino(
    {
        base: null,
        timestamp: false,
        formatters: {
            level(label, number) {
                return { level: label };
            },
        },
    },
    dest,
);
// asynchronously flush every 1 seconds to keep the buffer empty
// in periods of low activity
setInterval(function () {
    appLogger.flush();
}, 1000).unref();

// use pino.final to create a special logger that
// guarantees final tick writes
const handler = pino.final(appLogger, (err, finalLogger, evt) => {
    finalLogger.info(`${evt} caught`);
    if (err) {
        finalLogger.error(err, 'error caused exit');
    }
    process.exit(err ? 1 : 0);
});
// catch all the ways node might exit
process.on('beforeExit', () => handler(null, 'beforeExit'));
process.on('exit', () => handler(null, 'exit'));
process.on('uncaughtException', (err) => handler(err, 'uncaughtException'));
process.on('SIGINT', () => handler(null, 'SIGINT'));
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
process.on('SIGTERM', () => handler(null, 'SIGTERM'));

export { appLogger };
