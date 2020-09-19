import { appLogger } from 'src/logger';

export const CronJobSetup = () => {
    appLogger.info('Run job');
    // queueHello.add(null, { repeat: { cron: '* * 1 1 *' }, removeOnComplete: REMOVE_JOB_ON_COMPLETE });
};
