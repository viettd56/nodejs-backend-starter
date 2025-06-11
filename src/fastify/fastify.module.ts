import { Module } from '@nestjs/common';
import { FastifyService } from './fastify.service';
import { ConfigsModule } from 'src/configs/configs.module';
import { FastifyPluginService } from './fastifyPlugin.service';
import { RoutersModule } from 'src/routers/routers.module';
import { SwaggerModule } from 'src/swagger/swagger.module';

@Module({
    providers: [FastifyService, FastifyPluginService],
    exports: [FastifyService],
    imports: [ConfigsModule, RoutersModule, SwaggerModule],
})
export class FastifyModule {}
