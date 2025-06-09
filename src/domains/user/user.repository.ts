import _ from 'lodash';
import { UserModel } from 'src/models/data/User.model';
import { Transaction } from 'sequelize';
import { Exception } from 'src/helpers/Exception.helper';
import { UserEntity } from './user.entity';

const UserRepository = () => {
    const update = async (data: UserEntity, transaction?: Transaction) => {
        const { id, name, has_transaction_lock, email, password, username } = data.toObject();
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        await UserModel.update(
            {
                name,
                email,
                password,
                username,
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

    const findById = async (id: string) => {
        const data = await UserModel.findByPk(id);
        if (!data) {
            throw new Exception('User not found');
        }
        return UserEntity.modelToEntity(data, false);
    };

    const findByIdWithLock = async (id: string, transaction: Transaction) => {
        const data = await UserModel.findByPk(id, {
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!data) {
            throw new Exception('User not found');
        }
        return UserEntity.modelToEntity(data, true);
    };

    return {
        update,
        findById,
        findByIdWithLock,
    };
};

export const userRepository = UserRepository();
