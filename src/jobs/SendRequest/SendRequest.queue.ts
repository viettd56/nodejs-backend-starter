import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { SendRequestData } from '../types';
import { JobQueueConfigService } from '../JobQueue.config';

/**
 * Injectable service for managing the SendRequest queue.
 */
@Injectable()
export class SendRequestQueueService {
    public readonly queue: Queue<SendRequestData>;

    constructor(private readonly jobQueueConfig: JobQueueConfigService) {
        const { queueOpts } = this.jobQueueConfig;
        this.queue = new Queue<SendRequestData>('send_request', {
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
    }
}
