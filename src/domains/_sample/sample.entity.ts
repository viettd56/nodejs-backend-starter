import { SampleModel } from 'src/models/Sample.model';

export class SampleEntity {
    private id: string;
    private name: string;
    private has_transaction_lock: boolean;
    private extra_data: SampleModel['extra_data'];

    constructor({
        id,
        name,
        has_transaction_lock,
        extra_data,
    }: {
        id: string;
        name: string;
        has_transaction_lock: boolean;
        extra_data: SampleModel['extra_data'];
    }) {
        this.id = id;
        this.name = name;
        this.has_transaction_lock = has_transaction_lock;
        this.extra_data = extra_data;
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
            has_transaction_lock: this.has_transaction_lock,
            extra_data: this.extra_data,
        };
    }

    public static modelToEntity(obj: SampleModel, has_transaction_lock: boolean) {
        return new SampleEntity({ id: obj.id, name: obj.name, has_transaction_lock, extra_data: obj.extra_data });
    }

    public clearName() {
        this.name = '';
    }
}
