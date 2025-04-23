import Redis from 'ioredis';

export class RedisCache {
    prefix: string;
    ttl?: number;
    redis: Redis;

    constructor(redis: Redis, prefix: string, ttl?: number) {
        this.prefix = prefix;
        this.ttl = ttl ? Math.round(ttl) : undefined;
        this.redis = redis;
    }

    public async get(key: string) {
        try {
            const data = await this.redis.get(this.prefix + key);
            return data;
        } catch (error) {
            return undefined;
        } finally {
        }
    }

    public async set(key: string, value: string) {
        try {
            if (this.ttl) {
                return await this.redis.set(this.prefix + key, value, 'EX', this.ttl);
            } else {
                return await this.redis.set(this.prefix + key, value);
            }
        } catch (error) {
            return undefined;
        } finally {
        }
    }

    public async del(key: string) {
        try {
            const data = await this.redis.del(this.prefix + key);
            if (!data) {
                return data;
            }
            return data;
        } catch (error) {
            return undefined;
        }
    }

    public async incr(key: string) {
        try {
            const data = await this.redis.incr(this.prefix + key);
            if (!data) {
                return data;
            }
            if (data === 1) {
                await this.redis.expire(this.prefix + key, this.ttl || 0);
            }
            return data;
        } catch (error) {
            return undefined;
        }
    }
}
