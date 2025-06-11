import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { DatabaseConfig } from './Database.config';
import { RedisConfig } from './Redis.config';
import { ServerConfig } from './Server.config';
import { TokenJWTConfig } from './TokenJWT.config';

@Module({
    providers: [DatabaseConfig, RedisConfig, ServerConfig, TokenJWTConfig, ConfigsService],
    exports: [ConfigsService],
})
export class ConfigsModule {}
