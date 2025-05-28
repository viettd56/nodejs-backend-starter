import { sampleRepository } from "src/domains/_shared/_sample/sample.repository";
import { SampleEntity } from "./sample.entity";
import { sequelize } from "src/models/sequelize";
import { Exception } from "src/helpers/Exception.helper";

const SampleService = () => {
    const logic = async () => {
        const num = sampleRepository.logic();
        if (num > 0){
            return true
        } else if (num < 0){
            return false
        } else {
            return 'SampleService';
        }
    };

    const clearName = async (id: string) => {
        await sequelize.transaction(async (t) => {
            const sample = await sampleRepository.findByIdWithLock(id, t);
            if (!sample) {
                await t.rollback();
                throw new Exception('Sample not found');
            }
            
            const sampleEntity = SampleEntity.fromObjectModel(sample);
            sampleEntity.clearName();
            
            // Cập nhật trong cùng transaction để giữ lock
            await sampleRepository.update(sampleEntity, sample, t);
            
        })
     
    };

    return {
        logic,
        clearName,
    };
};

export const sampleService = SampleService();
