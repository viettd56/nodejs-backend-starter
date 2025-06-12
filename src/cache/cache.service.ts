import { Injectable } from '@nestjs/common';
import { RedisCache } from './redisCache.service';
import { CacheRepository } from './cache.repository';

@Injectable()
export class CacheService {
    constructor(private readonly cacheRepository: CacheRepository) {}

    public OtherCache(ttl: number) {
        const cache = new RedisCache(this.cacheRepository.cacheRepository, 'other:', ttl);
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
    }
}
