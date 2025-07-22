import _ from 'lodash';
import moment from 'moment-timezone';
import { bcryptHelper } from 'src/shared/helpers/Bcrypt.helper';
import { UserModel } from './user.model';
import { uuidv7 } from 'uuidv7';

const hashPassword = async (password: string) => {
    return bcryptHelper.hashPassword(password);
};

export class UserEntity {
    private id: string;
    private email: string | null;
    private name: string;
    private username: string | null;
    private password: string;
    private has_transaction_lock: boolean;
    private extra_data: UserModel['extra_data'];

    constructor(
        {
            id,
            name,
            username,
            password,
            email,
            extra_data,
        }: {
            id: string;
            name: string;
            username: string | null;
            password: string;
            email: string | null;
            extra_data: UserModel['extra_data'];
        },
        { has_transaction_lock }: { has_transaction_lock: boolean },
    ) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.has_transaction_lock = has_transaction_lock;
        this.extra_data = extra_data;
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
            username: this.username,
            password: this.password,
            email: this.email,
            has_transaction_lock: this.has_transaction_lock,
            extra_data: this.extra_data,
        };
    }

    public static modelToEntity(obj: UserModel, { has_transaction_lock }: { has_transaction_lock: boolean }) {
        return new UserEntity(
            {
                id: obj.id,
                name: obj.name,
                username: obj.username,
                password: obj.password,
                email: obj.email,
                extra_data: obj.extra_data,
            },
            { has_transaction_lock },
        );
    }

    public async changePassword(password: string) {
        this.password = await hashPassword(password);
    }

    public async comparePassword(password: string) {
        return bcryptHelper.comparePassword(password, this.password);
    }

    public static async newUser(
        {
            name,
            email,
            password,
            username,
        }: {
            email?: string;
            name: string;
            username?: string;
            password: string;
        },
        {
            has_transaction_lock,
        }: {
            has_transaction_lock: boolean;
        },
    ) {
        const userEntity = new UserEntity(
            {
                name,
                email: email || null,
                password: '',
                extra_data: {},
                username: username || null,
                id: uuidv7(),
            },
            {
                has_transaction_lock,
            },
        );
        await userEntity.changePassword(password);
        return userEntity;
    }
}
