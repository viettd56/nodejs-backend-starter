import { redisService } from './redis';
import { RedisCache } from './RedisCache';

export const OtherCache = (ttl: number) => {
    const cache = new RedisCache(redisService.redis, 'other:', ttl);
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
