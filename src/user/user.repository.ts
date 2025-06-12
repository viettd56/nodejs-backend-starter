import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from './user.entity';
import { Exception } from 'src/shared/helpers/Exception.helper';

@Injectable()
export class UserRepository {
    constructor(private readonly databaseService: DatabaseService) {}
    public update = async (data: UserEntity, transaction?: Transaction) => {
        const { id, name, has_transaction_lock, email, password, username, extra_data } = data.toObject();
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        await this.databaseService.userModel.update(
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
        const data = await this.databaseService.userModel.findByPk(id);
        if (!data) {
            throw new Exception('User not found');
        }
        return UserEntity.modelToEntity(data, false);
    };

    public findByIdWithLock = async (id: string, transaction: Transaction) => {
        const data = await this.databaseService.userModel.findByPk(id, {
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!data) {
            throw new Exception('User not found');
        }
        return UserEntity.modelToEntity(data, true);
    };

    public create = async (data: UserEntity, transaction?: Transaction) => {
        const { id, name, has_transaction_lock, extra_data, email, password, username } = data.toObject();
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        return await this.databaseService.userModel.create(
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
