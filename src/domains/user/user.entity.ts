import { bcryptHelper } from 'src/helpers/Bcrypt.helper';
import { UserModel } from 'src/models/data/User.model';

export class UserEntity {
    private _id: string;
    private _email: string | null;
    private _name: string;
    private _username: string | null;
    private _password: string;
    private _has_transaction_lock: boolean;

    constructor({
        id,
        name,
        username,
        password,
        email,
        has_transaction_lock,
    }: {
        id: string;
        name: string;
        username: string | null;
        password: string;
        email: string | null;
        has_transaction_lock: boolean;
    }) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._password = password;
        this._email = email;
        this._has_transaction_lock = has_transaction_lock;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get email() {
        return this._email;
    }

    public get username() {
        return this._username;
    }

    public get password() {
        return this._password;
    }

    public get has_transaction_lock() {
        return this._has_transaction_lock;
    }

    public static modelToEntity(obj: UserModel, has_transaction_lock: boolean) {
        return new UserEntity({
            id: obj.id,
            name: obj.name,
            username: obj.username,
            password: obj.password,
            email: obj.email,
            has_transaction_lock,
        });
    }

    public async changePassword(password: string) {
        this._password = await bcryptHelper.hashPassword(password);
    }
}
