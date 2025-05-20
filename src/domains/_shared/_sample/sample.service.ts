import { sampleRepository } from "src/domains/_shared/_sample/sample.repository";

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

    return {
        logic,
    };
};

export const sampleService = SampleService();
