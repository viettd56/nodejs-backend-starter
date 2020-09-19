import { ServiceBroker } from 'moleculer';
export interface SendParams {
    message: string;
}

export interface SendResponse {
    error_code: number;
    message: string;
}

export class OtherServices {
    private readonly serviceName = 'other';
    constructor(private readonly broker: ServiceBroker) {}

    public async send(params: SendParams): Promise<SendResponse> {
        const actionName = 'send';
        return await this.broker.call(this.serviceName + '.' + actionName, params, {});
    }
}
