import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    DATABASE_URL: string;
    DATABASE_READ_URL: string;
}
const DatabaseConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        DATABASE_URL: Joi.string().required(),
        DATABASE_READ_URL: Joi.string().required(),
    });
};

export const databaseConfig = DatabaseConfig();
