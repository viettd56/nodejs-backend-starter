import Redis from 'ioredis';
import { redisConfig } from '../configs/Redis.config';

const RedisService = () => {
    const {
        REDIS_CACHE_HOST,
        REDIS_CACHE_PASSWORD,
        REDIS_CACHE_PORT,
        REDIS_CACHE_PREFIX,
        REDIS_CACHE_TLS,
        REDIS_CACHE_DB,
    } = redisConfig;
    const create = (keyPrefix: string) => {
        const redis = new Redis({
            host: REDIS_CACHE_HOST,
            port: REDIS_CACHE_PORT,
            password: REDIS_CACHE_PASSWORD,
            keyPrefix,
            tls: REDIS_CACHE_TLS === true ? {} : undefined,
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
        redis: create(REDIS_CACHE_PREFIX),
        // global: create('global:'),
        create,
    };
};

export const redisService = RedisService();
