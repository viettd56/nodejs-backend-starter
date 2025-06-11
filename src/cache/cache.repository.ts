import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigsService } from 'src/configs/configs.service';

const createRedis = (redisConfig: {
    host: string;
    port: number;
    password: string;
    keyPrefix: string;
    tls: boolean;
}) => {
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
    return { redis };
};

@Injectable()
export class CacheRepository {
    private _cacheRepository: any;
    private _bullCacheRepository: any;

    constructor(private readonly config: ConfigsService) {
        const cacheRepository = createRedis({
            host: this.config.redisConfig.REDIS_CACHE_HOST,
            port: this.config.redisConfig.REDIS_CACHE_PORT,
            password: this.config.redisConfig.REDIS_CACHE_PASSWORD,
            keyPrefix: this.config.redisConfig.REDIS_CACHE_PREFIX,
            tls: this.config.redisConfig.REDIS_CACHE_TLS,
        });

        const bullCacheRepository = createRedis({
            host: this.config.redisConfig.REDIS_BULL_HOST,
            port: this.config.redisConfig.REDIS_BULL_PORT,
            password: this.config.redisConfig.REDIS_BULL_PASSWORD,
            keyPrefix: this.config.redisConfig.REDIS_BULL_PREFIX,
            tls: this.config.redisConfig.REDIS_BULL_TLS,
        });

        this._cacheRepository = cacheRepository;
        this._bullCacheRepository = bullCacheRepository;
    }

    get cacheRepository() {
        return this._cacheRepository;
    }

    get bullCacheRepository() {
        return this._bullCacheRepository;
    }
}
