import Redis from 'ioredis';
import { RedisCache } from './RedisCache';
import { cacheRepository } from './cache.repository';

const CacheService = () => {
    const cacheRedis = cacheRepository.redis;

    const OtherCache = (ttl: number) => {
        const cache = new RedisCache(cacheRedis, 'other:', ttl);
        return {
            async get(key: string) {
                const data = await cache.get(key);
                return data ?? undefined;
            },
            set(key: string, value: string) {
                return cache.set(key, value);
            },
            del(key: string) {
                return cache.del(key);
            },
            incr(key: string) {
                return cache.incr(key);
            },
        };
    };

    return {
        OtherCache,
    };
};

export const cacheService = CacheService();
