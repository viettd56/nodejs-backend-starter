import Bull from 'bull';

import { ICradle } from 'src/container';
import { JobRedisOpts } from './JobRedisOpts';

export const JobQueue = ({ databaseConfig }: Pick<ICradle, 'databaseConfig'>) => {
    const jobRedisOpts = JobRedisOpts({
        databaseConfig,
    });
    const { REDIS_BULL_PREFIX } = databaseConfig;
    const queueAddNote = new Bull<{
        note: string;
    }>(REDIS_BULL_PREFIX + 'add_note', jobRedisOpts as any);

    return {
        queueAddNote,
    };
};
