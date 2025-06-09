import _ from "lodash";
import { SampleEntity } from "./sample.entity";
import { SampleModel } from "src/models/Sample.model";
import { Transaction } from "sequelize";
import { sequelize } from "src/models/sequelize";
import { Exception } from "src/helpers/Exception.helper";

const SampleRepository = () => {
    const logic = () => {
        return _.random(-10, 10);
    };

    const update = async (data: SampleEntity, objectModel: SampleModel, transaction?: Transaction) => {
        const {id, name} = data.toObject();
        if (id !== objectModel.id){
            throw new Exception('Data invalid');
        }
        objectModel.name = name;
        return objectModel.save({transaction})
    };

    const findById = (id: string) => {
        return SampleModel.findByPk(id);
    };

    const findByIdWithLock = async (id: string, transaction: Transaction) => {
        return SampleModel.findByPk(id, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });
    };

    return {
        logic,
        update,
        findById,
        findByIdWithLock,
        getTransaction: sequelize.transaction
    };
};

export const sampleRepository = SampleRepository();
