import { bcryptHelper } from 'src/helpers/Bcrypt.helper';
import { UserModel } from 'src/models/data/User.model';

export class UserEntity {
    private id: string;
    private email: string | null;
    private name: string;
    private username: string | null;
    private password: string;
    private has_transaction_lock: boolean;

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
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.has_transaction_lock = has_transaction_lock;
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
            username: this.username,
            password: this.password,
            email: this.email,
            has_transaction_lock: this.has_transaction_lock,
        };
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
        this.password = await bcryptHelper.hashPassword(password);
    }
}
