import { JobOptions, sqsQueue } from 'src/domains/AWS/SQS/SQSQueue';
import { SendRequestData } from '../types';
import { sendRequestSQSConfig } from 'src/domains/AWS/SQS/SQSConfig';

const SendRequestQueue = () => {
    const { queueUrl, awsConfig } = sendRequestSQSConfig;
    const queue = new sqsQueue.Queue({
        queueUrl,
        awsConfig,
    });

    const add = async (data: SendRequestData, options?: JobOptions) => {
        const job = await queue.add(
            'send-request',
            {
                data,
            },
            options
        );
        return job;
    };

    return {
        add,
    };
};

export const sendRequestSqsQueue = SendRequestQueue();
