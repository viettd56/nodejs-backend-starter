import { SampleModel } from 'src/models/Sample.model';

export class SampleEntity {
    private id: string;
    private name: string;
    private has_transaction_lock: boolean;

    constructor({ id, name, has_transaction_lock }: { id: string; name: string; has_transaction_lock: boolean }) {
        this.id = id;
        this.name = name;
        this.has_transaction_lock = has_transaction_lock;
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
            has_transaction_lock: this.has_transaction_lock,
        };
    }

    public static modelToEntity(obj: SampleModel, has_transaction_lock: boolean) {
        return new SampleEntity({ id: obj.id, name: obj.name, has_transaction_lock });
    }

    public clearName() {
        this.name = '';
    }
}
