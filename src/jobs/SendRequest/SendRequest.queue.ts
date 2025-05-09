import { Queue } from 'bullmq';
import { SendRequestData } from '../types';
import { jobQueueConfig } from 'src/domains/_shared/jobQueue/JobQueue.config';

const QUEUE_NAME = 'send_request';

const SendRequestQueue = () => {
    const { queueOpts } = jobQueueConfig;

    const queue = new Queue<SendRequestData>(QUEUE_NAME, {
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

export const sendRequestQueue = SendRequestQueue();
