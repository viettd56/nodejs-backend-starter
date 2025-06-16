import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from './user.entity';
import { Exception } from 'src/shared/helpers/Exception.helper';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
    constructor() {}
    public update = async (data: UserEntity, transaction?: Transaction) => {
        const { id, name, has_transaction_lock, email, password, username, extra_data } = data.toObject();
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

    public findById = async (id: string) => {
        const data = await UserModel.findByPk(id);
        if (!data) {
            throw new Exception('User not found');
        }
        return UserEntity.modelToEntity(data, {
            has_transaction_lock: false,
        });
    };

    public findByIdWithLock = async (id: string, transaction: Transaction) => {
        const data = await UserModel.findByPk(id, {
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!data) {
            throw new Exception('User not found');
        }
        return UserEntity.modelToEntity(data, {
            has_transaction_lock: true,
        });
    };

    public create = async (data: UserEntity, transaction?: Transaction) => {
        const { id, name, has_transaction_lock, extra_data, email, password, username } = data.toObject();
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        return await UserModel.create(
            {
                id,
                name,
                extra_data,
                email,
                password,
                username,
            },
            {
                transaction,
            },
        );
    };
}
