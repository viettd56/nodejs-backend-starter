import Bull from 'bull';

import { ICradle } from 'src/container';

export const JobQueue = ({ databaseConfig }: ICradle) => {
    const { REDIS_BULL_HOST, REDIS_BULL_PORT, REDIS_BULL_PASSWORD, REDIS_BULL_PREFIX } = databaseConfig;
    const redis = {
        host: REDIS_BULL_HOST,
        port: REDIS_BULL_PORT,
        password: REDIS_BULL_PASSWORD,
        enableReadyCheck: false,
        maxRetriesPerRequest: null,
        keyPrefix: REDIS_BULL_PREFIX,
    };
    const queueAddNote = new Bull<{
        note: string;
    }>(REDIS_BULL_PREFIX + 'add_note', {
        redis,
        defaultJobOptions: {
            removeOnComplete: true,
            removeOnFail: true,
        },
    });

    return {
        queueAddNote,
    };
};
