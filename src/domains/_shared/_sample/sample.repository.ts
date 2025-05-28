import _ from "lodash";
import { SampleEntity } from "./sample.entity";
import { SampleModel } from "src/models/data/Sample.model";
import { ppid } from "process";

const SampleRepository = () => {
    const logic = () => {
        return _.random(-10, 10);
    };

    const update = (data: SampleEntity) => {
        const {id, name} = data.toObject();
        return SampleModel.update({
            name: name,
        }, {
            where: {
                id: id,
            },
        });
    };

    const findById = (id: string) => {
        return SampleModel.findByPk(id);
    };

    return {
        logic,
        update,
        findById,
    };
};

export const sampleRepository = SampleRepository();
