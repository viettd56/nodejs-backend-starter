import { sampleRepository } from "src/domains/_shared/_sample/sample.repository";
import { SampleEntity } from "./sample.entity";

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
        const sample = await sampleRepository.findById(id);
        if (!sample) {
            throw new Error('Sample not found');
        }
        const sampleEntity = SampleEntity.fromObjectModel(sample);
        sampleEntity.clearName();
        return sampleRepository.update(sampleEntity);
    };

    return {
        logic,
        clearName,
    };
};

export const sampleService = SampleService();
