import { SampleModel } from 'src/models/Sample.model';

export class SampleEntity {
    private _id: string;
    private _name: string;
    private _has_transaction_lock: boolean;

    constructor({ id, name, has_transaction_lock }: { id: string; name: string; has_transaction_lock: boolean }) {
        this._id = id;
        this._name = name;
        this._has_transaction_lock = has_transaction_lock;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get has_transaction_lock() {
        return this._has_transaction_lock;
    }

    public static modelToEntity(obj: SampleModel, has_transaction_lock: boolean) {
        return new SampleEntity({ id: obj.id, name: obj.name, has_transaction_lock });
    }

    public clearName() {
        this._name = '';
    }
}
