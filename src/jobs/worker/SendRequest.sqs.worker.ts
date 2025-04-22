import { JobOptions, sqsQueue } from 'src/domains/AWS/SQS/SQSQueue';
import { SendRequestData } from '../types';
import { sendRequestSQSConfig } from 'src/domains/AWS/SQS/SQSConfig';
import axios from 'axios';

const SendRequestWorker = () => {
    const { queueUrl, awsConfig } = sendRequestSQSConfig;

    const worker = new sqsQueue.Worker({
        queueUrl,
        awsConfig,
    });

    const process = () =>
        worker.process('send-request', 5, async (job: SendRequestData) => {
            console.log('🚀 ~ process ~ job:', job);
            try {
                const { method, url, body, headers, params } = job;
                const response = await axios({
                    method,
                    url,
                    params,
                    headers,
                    data: body,
                });

                console.log('🚀 ~ process ~ response:', response);
            } catch (error) {
                console.log('🚀 ~ worker.process ~ error:', error);
                throw error;
            }
        });

    return {
        process,
    };
};

export const sendRequestSqsWorker = SendRequestWorker();
