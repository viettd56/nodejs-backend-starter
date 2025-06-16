import { Injectable } from '@nestjs/common';
import { SendRequestQueueService } from './SendRequest/SendRequest.queue';
import { SendRequestWorkerService } from './SendRequest/SendRequest.worker';

@Injectable()
export class JobsService {
    private readonly _sendRequest: {
        queue: SendRequestQueueService;
        worker: SendRequestWorkerService;
    };

    constructor(
        private readonly sendRequestQueueService: SendRequestQueueService,
        private readonly sendRequestWorkerService: SendRequestWorkerService,
    ) {
        this._sendRequest = {
            queue: this.sendRequestQueueService,
            worker: this.sendRequestWorkerService,
        };
    }

    public get sendRequest() {
        return this._sendRequest;
    }
}
