import { ServiceBroker } from 'moleculer';

export interface CreateNoteParams {
    note: string;
}

export interface CreateNoteResponse {
    error_code: number;
    message: string;
    data: {
        id: string;
        note: string;
        status: string;
    };
}

export class TemplateServices {
    private readonly serviceName = 'template';
    constructor(private readonly broker: ServiceBroker) {}

    public async createNote(params: CreateNoteParams): Promise<CreateNoteResponse> {
        const actionName = 'create-note';
        return await this.broker.call(this.serviceName + '.' + actionName, params);
    }
}
