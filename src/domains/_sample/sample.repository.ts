import _ from 'lodash';
import { SampleEntity } from './sample.entity';
import { SampleModel } from 'src/models/Sample.model';
import { Transaction } from 'sequelize';
import { Exception } from 'src/helpers/Exception.helper';

const SampleRepository = () => {
    const update = async (data: SampleEntity, transaction?: Transaction) => {
        const { id, name, has_transaction_lock, extra_data } = data.toObject();
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        await SampleModel.update(
            {
                name,
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

    const create = async (data: SampleEntity, transaction?: Transaction) => {
        const { id, name, has_transaction_lock, extra_data } = data.toObject();
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        return await SampleModel.create(
            {
                id,
                name,
                extra_data,
            },
            {
                transaction,
            },
        );
    };

    const findById = async (id: string) => {
        const data = await SampleModel.findByPk(id);
        if (!data) {
            throw new Exception('Sample not found');
        }
        return SampleEntity.modelToEntity(data, false);
    };

    const findByIdWithLock = async (id: string, transaction: Transaction) => {
        const data = await SampleModel.findByPk(id, {
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!data) {
            throw new Exception('Sample not found');
        }
        return SampleEntity.modelToEntity(data, true);
    };

    return {
        update,
        findById,
        findByIdWithLock,
        create,
    };
};

export const sampleRepository = SampleRepository();
