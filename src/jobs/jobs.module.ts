import { Module } from '@nestjs/common';
import { ConfigsModule } from 'src/configs/configs.module';
import { JobQueueConfigService } from './JobQueue.config';
import { SendRequestQueueService } from './SendRequest/SendRequest.queue';
import { SendRequestWorkerService } from './SendRequest/SendRequest.worker';
import { JobsService } from './jobs.service';

@Module({
    providers: [SendRequestQueueService, SendRequestWorkerService, JobQueueConfigService, JobsService],
    exports: [JobsService],
    imports: [ConfigsModule],
})
export class JobsModule {}
