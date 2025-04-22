import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { setTimeout } from 'timers/promises';

export interface JobOptions {
    delay?: number;
    attempts?: number;
    backoff?: {
        type: 'fixed' | 'exponential';
        delay: number;
    };
}

class Queue {
    private sqsClient: SQSClient;
    private queueUrl: string;

    constructor({
        queueUrl,
        awsConfig,
    }: {
        queueUrl: string;
        awsConfig: {
            region: string;
            credentials: {
                accessKeyId: string;
                secretAccessKey: string;
            };
        };
    }) {
        this.sqsClient = new SQSClient({
            region: awsConfig.region,
            credentials: awsConfig.credentials,
        });
        this.queueUrl = queueUrl;
    }

    async add(jobName: string, data: any, options?: JobOptions): Promise<string> {
        const messageBody = JSON.stringify({
            name: jobName,
            data: data,
            opts: options,
            timestamp: Date.now(),
            attempts: 0,
        });

        const command = new SendMessageCommand({
            QueueUrl: this.queueUrl,
            MessageBody: messageBody,
            DelaySeconds: options?.delay ? Math.floor(options.delay / 1000) : 0,
        });

        const response = await this.sqsClient.send(command);
        return response.MessageId || '';
    }

    async process(jobName: string, concurrency: number, processor: (job: any) => Promise<void>) {
        const processJob = async () => {
            try {
                const receiveCommand = new ReceiveMessageCommand({
                    QueueUrl: this.queueUrl,
                    MaxNumberOfMessages: concurrency,
                    WaitTimeSeconds: 20, // Long polling
                });

                const response = await this.sqsClient.send(receiveCommand);

                if (response.Messages) {
                    for (const message of response.Messages) {
                        let job;
                        try {
                            job = JSON.parse(message.Body || '{}');

                            if (job.name === jobName) {
                                await processor(job);

                                // Delete the message after successful processing
                                await this.sqsClient.send(
                                    new DeleteMessageCommand({
                                        QueueUrl: this.queueUrl,
                                        ReceiptHandle: message.ReceiptHandle,
                                    })
                                );
                            }
                        } catch (error) {
                            // Handle job processing errors
                            if (job?.opts?.attempts && job.attempts < job.opts.attempts) {
                                // Retry logic
                                await this.handleRetry(job, message);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error processing jobs:', error);
            }

            // Continue processing
            await setTimeout(500);
            processJob();
        };

        // Start processing
        for (let i = 0; i < concurrency; i++) {
            processJob();
        }
    }

    private async handleRetry(job: any, message: any) {
        job.attempts++;

        let delay = 0;
        if (job.opts.backoff) {
            switch (job.opts.backoff.type) {
                case 'fixed':
                    delay = job.opts.backoff.delay;
                    break;
                case 'exponential':
                    delay = job.opts.backoff.delay * 2 ** job.attempts;
                    break;
            }
        }

        // Re-add the job with updated attempts and delay
        await this.add(job.name, job.data, {
            ...job.opts,
            delay: delay,
        });

        // Delete the original message
        await this.sqsClient.send(
            new DeleteMessageCommand({
                QueueUrl: this.queueUrl,
                ReceiptHandle: message.ReceiptHandle,
            })
        );
    }
}

class Worker {
    private queue: Queue;

    constructor({
        queueUrl,
        awsConfig,
    }: {
        queueUrl: string;
        awsConfig: {
            region: string;
            credentials: {
                accessKeyId: string;
                secretAccessKey: string;
            };
        };
    }) {
        this.queue = new Queue({ queueUrl, awsConfig });
    }

    process(jobName: string, concurrency: number, processor: (job: any) => Promise<void>) {
        return this.queue.process(jobName, concurrency, processor);
    }
}

const SQSQueue = () => {
    return {
        Queue,
        Worker,
    };
};

export const sqsQueue = SQSQueue();
