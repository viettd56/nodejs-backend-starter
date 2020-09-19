import RedisCache from './RedisCache';
import { ICradle } from 'src/container';

export const ConfigWorkspaceCache = ({ cacheConfig, redisService }: Pick<ICradle, 'cacheConfig' | 'redisService'>) => {
    const cache = new RedisCache(redisService.redis, 'config_work_space:', cacheConfig.CACHE_TTL);
    return {
        async get(key: string): Promise<{ logo: string; workspace_is_active: boolean } | undefined> {
            const data = await cache.get(key);
            if (!data) {
                return undefined;
            } else {
                return JSON.parse(data);
            }
        },

        set(key: string, value: { logo: string; workspace_is_active: boolean }) {
            return cache.set(key, JSON.stringify(value));
        },

        del(key: string) {
            return cache.del(key);
        },
    };
};
