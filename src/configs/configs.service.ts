import { Injectable } from '@nestjs/common';
import { TokenJWTConfig } from './TokenJWT.config';
import { RedisConfig } from './Redis.config';
import { DatabaseConfig } from './Database.config';
import { ServerConfig } from './Server.config';

@Injectable()
export class ConfigsService {
    private _databaseConfig: DatabaseConfig;
    private _redisConfig: RedisConfig;
    private _serverConfig: ServerConfig;
    private _tokenJWTConfig: TokenJWTConfig;

    constructor(
        private readonly __databaseConfig: DatabaseConfig,
        private readonly __redisConfig: RedisConfig,
        private readonly __serverConfig: ServerConfig,
        private readonly __tokenJWTConfig: TokenJWTConfig,
    ) {
        this._databaseConfig = this.__databaseConfig;
        this._redisConfig = this.__redisConfig;
        this._serverConfig = this.__serverConfig;
        this._tokenJWTConfig = this.__tokenJWTConfig;
    }

    get databaseConfig() {
        return this._databaseConfig;
    }

    get redisConfig() {
        return this._redisConfig;
    }

    get serverConfig() {
        return this._serverConfig;
    }

    get tokenJWTConfig() {
        return this._tokenJWTConfig;
    }
}
