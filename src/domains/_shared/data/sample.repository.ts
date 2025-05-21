import _ from "lodash";

const SampleRepository = () => {
    const logic = () => {
        return _.random(-10, 10);
    };

    return {
        logic,
    };
};

export const sampleRepository = SampleRepository();
