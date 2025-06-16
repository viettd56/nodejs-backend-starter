import { Injectable } from '@nestjs/common';
import { Worker } from 'bullmq';
import { SendRequestData } from '../types';
import { SendRequestQueueService } from './SendRequest.queue';
import axios from 'axios';
import { JobQueueConfigService } from '../JobQueue.config';

/**
 * Injectable service for managing the SendRequest worker.
 */
@Injectable()
export class SendRequestWorkerService {
    public readonly worker: Worker<SendRequestData>;

    constructor(
        private readonly sendRequestQueueService: SendRequestQueueService,
        private readonly jobQueueConfigService: JobQueueConfigService,
    ) {
        const { workerOpts, failedHandler } = this.jobQueueConfigService;

        this.worker = new Worker<SendRequestData>(
            this.sendRequestQueueService.queue.name,
            async (job) => {
                const { method, url, body, headers, params } = job.data;
                await axios({
                    method,
                    url,
                    params,
                    headers,
                    data: body,
                    timeout: 5000,
                });
            },
            {
                ...workerOpts,
                concurrency: 10,
                lockDuration: 7000,
            },
        );

        this.worker.on('error', (err) => {
            // eslint-disable-next-line no-console
            console.error(err);
        });

        this.worker.on('failed', failedHandler);
    }
}
