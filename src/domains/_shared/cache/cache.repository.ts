import Redis from 'ioredis';
import { redisConfig } from 'src/configs/Redis.config';
const CacheRepository = (redisConfig: {
    host: string;
    port: number;
    password: string;
    keyPrefix: string;
    tls: boolean;
}) => {
    const createRedis = () => {
        const redis = new Redis({
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.password,
            keyPrefix: redisConfig.keyPrefix,
            tls: redisConfig.tls === true ? {} : undefined,
            // db: REDIS_CACHE_DB,
            // db: 10,
        });

        // const close = () => {
        //     redis.quit();
        // };

        redis.on('error', (e) => {
            console.log('Redis connect error', e);
        });
        return redis;
    };
    return {
        createRedis,
    };
};

export const cacheRepository = CacheRepository({
    host: redisConfig.REDIS_CACHE_HOST,
    port: redisConfig.REDIS_CACHE_PORT,
    password: redisConfig.REDIS_CACHE_PASSWORD,
    keyPrefix: redisConfig.REDIS_CACHE_PREFIX,
    tls: redisConfig.REDIS_CACHE_TLS,
});

export const bullCacheRepository = CacheRepository({
    host: redisConfig.REDIS_BULL_HOST,
    port: redisConfig.REDIS_BULL_PORT,
    password: redisConfig.REDIS_BULL_PASSWORD,
    keyPrefix: redisConfig.REDIS_BULL_PREFIX,
    tls: redisConfig.REDIS_BULL_TLS,
});
