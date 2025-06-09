import { bcryptHelper } from 'src/helpers/Bcrypt.helper';
import { UserModel } from 'src/models/data/User.model';

export class UserEntity {
    private _id: string;
    private _email: string | null;
    private _name: string;
    private _username: string | null;
    private _password: string;

    constructor({
        id,
        name,
        username,
        password,
        email,
    }: {
        id: string;
        name: string;
        username: string | null;
        password: string;
        email: string | null;
    }) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._password = password;
        this._email = email;
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

    public toObject() {
        return {
            id: this._id,
            name: this._name,
        };
    }

    public static modelToEntity(obj: UserModel) {
        return new UserEntity({
            id: obj.id,
            name: obj.name,
            username: obj.username,
            password: obj.password,
            email: obj.email,
        });
    }

    public async changePassword(password: string) {
        this._password = await bcryptHelper.hashPassword(password);
    }
}
