// Redis config
import Redis from 'ioredis';
import { appLogger } from 'src/logger';
import { ICradle } from 'src/container';

export const RedisService = ({ databaseConfig }: ICradle) => {
    const { REDIS_CACHE_HOST, REDIS_CACHE_PORT, REDIS_CACHE_PREFIX, REDIS_CACHE_PASSWORD } = databaseConfig;
    const redis = new Redis({
        host: REDIS_CACHE_HOST,
        port: REDIS_CACHE_PORT,
        password: REDIS_CACHE_PASSWORD,
        keyPrefix: REDIS_CACHE_PREFIX,
    });

    const close = () => {
        redis.quit();
    };

    redis.on('error', () => {
        appLogger.error('Redis connect error');
    });
    return {
        redis,
        close,
    };
};
