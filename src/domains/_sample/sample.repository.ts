import _ from 'lodash';
import { SampleEntity } from './sample.entity';
import { SampleModel } from 'src/models/Sample.model';
import { Transaction } from 'sequelize';
import { sequelize } from 'src/models/sequelize';
import { Exception } from 'src/helpers/Exception.helper';

const SampleRepository = () => {
    const update = async (data: SampleEntity, transaction?: Transaction) => {
        const { id, name, has_transaction_lock } = data;
        if (has_transaction_lock === true && !transaction) {
            throw new Exception('Transaction is required');
        }
        await SampleModel.update(
            {
                name,
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
        getTransaction: sequelize.transaction,
    };
};

export const sampleRepository = SampleRepository();
