import Redis from 'ioredis';

/**
 * RedisCache provides a simple wrapper for Redis operations with key prefixing and optional TTL.
 */
export class RedisCache {
    private readonly prefix: string;
    private readonly ttl?: number;
    private readonly redis: Redis;

    /**
     * @param redis Redis client instance
     * @param prefix Key prefix for all cache entries
     * @param ttl Optional time-to-live for cache entries (in seconds)
     */
    constructor(redis: Redis, prefix: string, ttl?: number) {
        this.prefix = prefix;
        this.ttl = ttl ? Math.round(ttl) : undefined;
        this.redis = redis;
    }

    /**
     * Get a value from cache by key.
     * @param key Cache key
     * @returns Cached value or undefined if not found or error occurs
     */
    public async get(key: string): Promise<string | undefined> {
        try {
            const data = await this.redis.get(this.prefix + key);
            return data ?? undefined;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Set a value in cache.
     * @param key Cache key
     * @param value Value to cache
     * @returns Redis status string or undefined if error occurs
     */
    public async set(key: string, value: string): Promise<string | undefined> {
        try {
            if (this.ttl) {
                return await this.redis.set(this.prefix + key, value, 'EX', this.ttl);
            }
            return await this.redis.set(this.prefix + key, value);
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Delete a value from cache.
     * @param key Cache key
     * @returns Number of keys deleted or undefined if error occurs
     */
    public async del(key: string): Promise<number | undefined> {
        try {
            const data = await this.redis.del(this.prefix + key);
            return data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Increment a value in cache.
     * @param key Cache key
     * @returns New value after increment or undefined if error occurs
     */
    public async incr(key: string): Promise<number | undefined> {
        try {
            const data = await this.redis.incr(this.prefix + key);
            if (data === 1) {
                await this.redis.expire(this.prefix + key, this.ttl || 0);
            }
            return data;
        } catch (error) {
            return undefined;
        }
    }
}
