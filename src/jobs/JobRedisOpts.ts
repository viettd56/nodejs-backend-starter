import Redis from 'ioredis';
import { ICradle } from 'src/container';
export const JobRedisOpts = ({ databaseConfig }: Pick<ICradle, 'databaseConfig'>) => {
    const { REDIS_BULL_HOST, REDIS_BULL_PORT, REDIS_BULL_PREFIX, REDIS_BULL_PASSWORD } = databaseConfig;
    const client = new Redis({
        host: REDIS_BULL_HOST,
        port: REDIS_BULL_PORT,
        password: REDIS_BULL_PASSWORD,
        enableReadyCheck: false,
        maxRetriesPerRequest: null,
        keyPrefix: REDIS_BULL_PREFIX,
    });

    const subscriber = new Redis({
        host: REDIS_BULL_HOST,
        port: REDIS_BULL_PORT,
        password: REDIS_BULL_PASSWORD,
        enableReadyCheck: false,
        maxRetriesPerRequest: null,
        keyPrefix: REDIS_BULL_PREFIX,
    });

    return {
        createClient: (type: 'client' | 'subscriber' | 'bclient') => {
            switch (type) {
                case 'client':
                    return client;
                case 'subscriber':
                    return subscriber;
                default:
                    return new Redis({
                        host: REDIS_BULL_HOST,
                        port: REDIS_BULL_PORT,
                        password: REDIS_BULL_PASSWORD,
                        enableReadyCheck: false,
                        maxRetriesPerRequest: null,
                        keyPrefix: REDIS_BULL_PREFIX,
                    });
            }
        },
    };
};
