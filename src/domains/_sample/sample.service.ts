import { sampleRepository } from 'src/domains/_sample/sample.repository';
import { Exception } from 'src/helpers/Exception.helper';
import _ from 'lodash';
import { sequelize } from 'src/models/sequelize';

const SampleService = () => {
    const logic = async () => {
        const num = _.random(-10, 10);
        if (num > 0) {
            return true;
        } else if (num < 0) {
            return false;
        } else {
            return 'SampleService';
        }
    };

    const clearName = async (id: string) => {
        await sequelize.transaction(async (transaction) => {
            const sampleEntity = await sampleRepository.findByIdWithLock(id, transaction);
            if (!sampleEntity) {
                throw new Exception('Sample not found');
            }
            sampleEntity.clearName();

            // Cập nhật trong cùng transaction để giữ lock
            await sampleRepository.update(sampleEntity, transaction);
        });
    };

    return {
        logic,
        clearName,
    };
};

export const sampleService = SampleService();
