import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigsModule } from './configs/configs.module';
import { HelpersModule } from './helpers/helpers.module';
import { CacheModule } from './cache/cache.module';
import { FastifyModule } from './fastify/fastify.module';
import { TokenModule } from './token/token.module';
import { RoutersModule } from './routers/routers.module';
import { UserModule } from './user/user.module';
import { SwaggerModule } from './swagger/swagger.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigsModule,
        HelpersModule,
        CacheModule,
        FastifyModule,
        TokenModule,
        RoutersModule,
        DatabaseModule,
        UserModule,
        SwaggerModule,
    ],
    providers: [AppService],
})
export class AppModule {}
