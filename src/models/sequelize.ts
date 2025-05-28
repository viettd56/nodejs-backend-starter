import { Sequelize } from 'sequelize-typescript';
import { parse } from 'pg-connection-string';
import { UserModel } from './data/User.model';
import { databaseConfig } from 'src/configs/Database.config';
import { SampleModel } from './Sample.model';

const models = [UserModel, SampleModel];

const dialectOptions =
    process.env.PG_SSL === 'true'
        ? {
              dialectOptions: {
                  ssl: {
                      require: true,
                      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
                  },
                  application_name: 'api',
              },
          }
        : {
              application_name: 'api',
          };

const dbWriteParse = parse(databaseConfig.DATABASE_URL, {});
const listDbReadParse = databaseConfig.DATABASE_READ_URL.split(';');

export const sequelize: Sequelize = new Sequelize(databaseConfig.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    timezone: '+07:00',
    models: models,
    replication: {
        read: listDbReadParse.map((d) => {
            const { host, user, password } = parse(d, {});
            return {
                host: host || '',
                username: user,
                password: password,
            };
        }),
        write: {
            host: dbWriteParse.host || '',
            username: dbWriteParse.user,
            password: dbWriteParse.password,
        },
    },
    ...dialectOptions,
    pool: {
        min: 1,
    },
    retry: {
        match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
        ],
        max: Infinity,
    },
});
