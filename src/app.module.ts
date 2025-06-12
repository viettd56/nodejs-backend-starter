import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigsModule } from './configs/configs.module';
import { CacheModule } from './cache/cache.module';
import { TokenModule } from './token/token.module';
import { RoutersModule } from './routers/routers.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { JobsModule } from './jobs/jobs.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HelpersModule } from './shared/helpers/helpers.module';
import { FastifyModule } from './core/fastify/fastify.module';
import { SwaggerModule } from './core/swagger/swagger.module';

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
        JobsModule,
        CoreModule,
        SharedModule,
    ],
    providers: [AppService],
})
export class AppModule {}
