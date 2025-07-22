import { Injectable } from '@nestjs/common';
import { Transaction, WhereOptions } from 'sequelize';
import { UserEntity } from './user.entity';
import { Exception } from 'src/shared/helpers/Exception.helper';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
    constructor() {}
    public update = async (data: UserEntity, transaction?: Transaction) => {
        const { id, name, username, password, email, extra_data, has_transaction_lock } = data.toObject();
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        await UserModel.update(
            {
                name,
                email,
                password,
                username,
                extra_data,
            },
            {
                where: {
                    id,
                },
                transaction,
            },
        );
        return true;
    };

    public findById = async (id: string, transaction?: Transaction) => {
        const data = await UserModel.findByPk(id, {
            transaction,
            lock: transaction?.LOCK.UPDATE,
        });

        if (!data) {
            return undefined;
        }
        return UserEntity.modelToEntity(data, {
            has_transaction_lock: !!transaction,
        });
    };

    public create = async (data: UserEntity, transaction?: Transaction) => {
        const { id, name, username, password, email, extra_data, has_transaction_lock } = data.toObject();
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        return await UserModel.create(
            {
                id,
                name,
                username,
                password,
                email,
                extra_data,
            },
            {
                transaction,
            },
        );
    };

    public findByUsername = async (username: string, transaction?: Transaction) => {
        const data = await UserModel.findOne({
            where: { username },
            transaction,
            lock: transaction?.LOCK.UPDATE,
        });
        if (!data) {
            return undefined;
        }
        return UserEntity.modelToEntity(data, {
            has_transaction_lock: false,
        });
    };

    public findByEmail = async (email: string, transaction?: Transaction) => {
        const data = await UserModel.findOne({
            where: { email },
            transaction,
            lock: transaction?.LOCK.UPDATE,
        });
        if (!data) {
            return undefined;
        }
        return UserEntity.modelToEntity(data, {
            has_transaction_lock: false,
        });
    };
}
