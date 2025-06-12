import { Injectable, Inject } from '@nestjs/common';
import { ConnectionOptions, QueueOptions, MetricsTime, WorkerOptions, MinimalJob } from 'bullmq';
import { ConfigsService } from 'src/configs/configs.service';

/**
 * Injectable service for providing BullMQ job queue configuration.
 */
export interface RedisConfig {
    host: string;
    port: number;
    password: string;
    keyPrefix: string;
    tls: boolean;
}

@Injectable()
export class JobQueueConfigService {
    public readonly queueOpts: QueueOptions;
    public readonly workerOpts: WorkerOptions;
    public readonly failedHandler: (err: any) => void;

    constructor(private readonly config: ConfigsService) {
        const connection: ConnectionOptions = {
            host: this.config.redisConfig.REDIS_BULL_HOST,
            port: this.config.redisConfig.REDIS_BULL_PORT,
            password: this.config.redisConfig.REDIS_BULL_PASSWORD,
            tls: this.config.redisConfig.REDIS_BULL_TLS === true ? {} : undefined,
        };

        this.queueOpts = {
            connection,
            defaultJobOptions: {
                removeOnComplete: 100,
                removeOnFail: 100000,
            },
            prefix: this.config.redisConfig.REDIS_BULL_PREFIX,
        };

        this.workerOpts = {
            autorun: false,
            concurrency: 3,
            connection,
            prefix: this.config.redisConfig.REDIS_BULL_PREFIX,
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

        this.failedHandler = (err: any) => {
            const { name, data, failedReason } = err;
            // eslint-disable-next-line no-console
            console.error({
                name,
                data,
                failedReason,
            });
        };
    }
}
