import { Worker } from 'bullmq';
import { jobQueueConfig } from '../JobQueue.config';
import { SendRequestData } from '../types';
import { sendRequestQueue } from './SendRequest.queue';
import axios from 'axios';

export const SendRequestWorker = () => {
    const { workerOpts, failedHandler } = jobQueueConfig;

    const worker = new Worker<SendRequestData>(
        sendRequestQueue.queue.name,
        async (job) => {
            // console.log('🚀 ~ worker ~ job.data:', job.data);
            const { method, url, body, headers, params } = job.data;
            const response = await axios({
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

    worker.on('error', (err) => {
        // log the error
        console.error(err);
    });

    worker.on('failed', failedHandler);

    return {
        worker,
    };
};
