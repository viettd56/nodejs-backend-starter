import { ValidationHelper, Joi } from 'src/helpers/Validation.helper';
import { ICradle } from 'src/container';

interface IConfigs {
    DEBUG_GRAPHQL: boolean;
    GRAPHQL_PLAYGROUND: boolean;
    GRAPHQL_PORT: number;
}

export const GraphQLConfig = ({ env }: ICradle) => {
    return new ValidationHelper<IConfigs>(env).validate({
        DEBUG_GRAPHQL: Joi.boolean().default(false),
        GRAPHQL_PLAYGROUND: Joi.boolean().default(false),
        GRAPHQL_PORT: Joi.number().default(4000),
    });
};
