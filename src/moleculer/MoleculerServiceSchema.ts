import { ICradle } from 'src/container';

export const MoleculerServiceSchema = ({ noteAction }: ICradle) => {
    const createServiceSchema = (name: string) => {
        const actions = {
            ...noteAction.createServiceAction(),
        };

        return {
            name,
            actions,
        };
    };

    return {
        createServiceSchema,
    };
};
