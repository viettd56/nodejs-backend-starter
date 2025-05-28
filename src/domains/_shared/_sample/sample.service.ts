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
        const transaction = await sampleRepository.getTransaction();
        try {
            // Tìm và lock bản ghi để ngăn các thao tác khác cập nhật cho đến khi hoàn thành
            const sample = await sampleRepository.findByIdWithLock(id, transaction);
            if (!sample) {
                throw new Exception('Sample not found');
            }
            
            const sampleEntity = SampleEntity.fromObjectModel(sample);
            sampleEntity.clearName();
            
            // Cập nhật trong cùng transaction để giữ lock
            await sampleRepository.update(sampleEntity, sample, transaction);
            
            // Commit transaction để hoàn thành và giải phóng lock
            await transaction.commit();
            return true;
        } catch (error) {
            // Rollback transaction nếu có lỗi
            await transaction.rollback();
            throw error;
        }
    };

    return {
        logic,
        clearName,
    };
};

export const sampleService = SampleService();
