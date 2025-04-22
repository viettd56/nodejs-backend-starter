import { Queue } from 'bullmq';
import { jobQueueConfig } from '../JobQueue.config';
import { VerifyOrderJobData } from '../types';

const QUEUE_NAME = 'verify_order';

const VerifyOrderQueue = () => {
    const { queueOpts } = jobQueueConfig;

    const queue = new Queue<VerifyOrderJobData>(QUEUE_NAME, {
        ...queueOpts,
        defaultJobOptions: {
            ...queueOpts.defaultJobOptions,
            attempts: 15,
            backoff: {
                type: 'exponential',
                delay: 5000,
            },
        },
    });

    return {
        queue,
    };
};

export const verifyOrderQueue = VerifyOrderQueue();
