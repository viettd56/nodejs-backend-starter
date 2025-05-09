import { ConnectionOptions, QueueOptions, MetricsTime, WorkerOptions, MinimalJob } from 'bullmq';
import { redisConfig } from 'src/configs/Redis.config';

const JobQueueConfig = (redisConfig: {
    host: string;
    port: number;
    password: string;
    keyPrefix: string;
    tls: boolean;
}) => {
    const connection: ConnectionOptions = {
        // enableOfflineQueue: false,
        host: redisConfig.host,
        port: redisConfig.port,
        password: redisConfig.password,
        // db: REDIS_BULL_DB,
        // enableReadyCheck: false,
        // maxRetriesPerRequest: null,
        // db: 10,
        tls: redisConfig.tls === true ? {} : undefined,
    };

    const queueOpts: QueueOptions = {
        connection,
        defaultJobOptions: {
            removeOnComplete: 100,
            removeOnFail: 100000,
        },
        prefix: redisConfig.keyPrefix,
    };

    const workerOpts: WorkerOptions = {
        autorun: false,
        concurrency: 3,
        connection,
        prefix: redisConfig.keyPrefix,
        metrics: {
            maxDataPoints: MetricsTime.ONE_WEEK * 2,
        },
        settings: {
            backoffStrategy: (attemptsMade?: number, type?: string, err?: Error, job?: MinimalJob) => {
                switch (type) {
                    case 'jitter': {
                        const baseDelay = 1000;
                        if (attemptsMade) {
                            const timeDelay = Math.round(baseDelay * Math.pow(2, attemptsMade));
                            const hour = 60 * 60 * 1000;
                            return timeDelay < hour ? timeDelay : hour;
                        }
                        return baseDelay;
                    }
                    default: {
                        throw new Error('invalid type');
                    }
                }
            },
        },
    };

    const failedHandler = (err: any) => {
        // log the error
        const { name, data, failedReason } = err;
        console.error({
            name,
            data,
            failedReason,
        });
    };

    return {
        queueOpts,
        workerOpts,
        failedHandler,
    };
};
export const jobQueueConfig = JobQueueConfig({
    host: redisConfig.REDIS_BULL_HOST,
    port: redisConfig.REDIS_BULL_PORT,
    password: redisConfig.REDIS_BULL_PASSWORD,
    keyPrefix: redisConfig.REDIS_BULL_PREFIX,
    tls: redisConfig.REDIS_BULL_TLS,
});
