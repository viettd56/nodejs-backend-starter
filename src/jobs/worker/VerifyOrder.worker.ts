import { Worker } from 'bullmq';
import { jobQueueConfig } from '../JobQueue.config';
import { VerifyOrderJobData } from '../types';
import { verifyOrderQueue } from '../queue/VerifyOrder.queue';
import { orderUsecase } from 'src/domains/Order/order.usecase';

export const VerifyOrderWorker = () => {
    const { workerOpts, failedHandler } = jobQueueConfig;

    const worker = new Worker<VerifyOrderJobData>(
        verifyOrderQueue.queue.name,
        async (job) => {
            // console.log('🚀 ~ worker ~ job.data:', job.data);
            const data = await orderUsecase.verifyOrder(job.data.verify_id);
            if (data.status === 'success') {
                return data.toJSON();
            }
            throw new Error('Order status: ' + data.status);
        },
        {
            ...workerOpts,
            concurrency: 1,
            lockDuration: 120000,
        }
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
