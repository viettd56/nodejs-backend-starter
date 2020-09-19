import Redis from 'ioredis';
class RedisCache {
    prefix: string;
    ttl?: number;
    redis: Redis.Redis;

    constructor(redis: Redis.Redis, prefix: string, ttl?: number) {
        this.prefix = prefix;
        this.ttl = ttl;
        this.redis = redis;
    }

    public async get(key: string) {
        try {
            const data = await this.redis.get(this.prefix + key);
            return data;
        } catch (error) {
            return undefined;
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
}

export default RedisCache;
