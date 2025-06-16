import { Injectable } from '@nestjs/common';
import { ConfigsService } from 'src/configs/configs.service';

import { parse } from 'pg-connection-string';
import { UserModel } from './data/User/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService {
    private _sequelize: Sequelize;
    private _userModel: typeof UserModel;
    constructor(private readonly configsService: ConfigsService) {
        const models = [UserModel];
        const dbWriteParse = parse(this.configsService.databaseConfig.DATABASE_URL, {});
        const listDbReadParse = this.configsService.databaseConfig.DATABASE_READ_URL.split(';');

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

        this._sequelize = new Sequelize(this.configsService.databaseConfig.DATABASE_URL, {
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
        this._userModel = UserModel;
    }

    public get sequelize(): Sequelize {
        return this._sequelize;
    }

    public get userModel(): typeof UserModel {
        return this._userModel;
    }
}
