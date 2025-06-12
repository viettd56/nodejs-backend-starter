import { Injectable } from '@nestjs/common';
import Fastify, { FastifyInstance } from 'fastify';
import { ConfigsService } from 'src/configs/configs.service';
import { RoutersService } from 'src/routers/routers.service';
import { FastifyPluginService } from './fastifyPlugin.service';
import { SwaggerService } from '../swagger/swagger.service';

@Injectable()
export class FastifyService {
    private readonly fastify: FastifyInstance;
    constructor(
        private readonly fastifyPluginService: FastifyPluginService,
        private readonly configsService: ConfigsService,
        private readonly routersService: RoutersService,
        private readonly swaggerService: SwaggerService,
    ) {
        const fastify = Fastify({
            // logger: { level: 'error`' },
            // logger: true,
            trustProxy: true,
        });

        this.fastifyPluginService.setCommonMiddleware(fastify);
        this.fastifyPluginService.setBasicAuth(fastify);
        this.fastifyPluginService.setErrorHandler(fastify);
        this.fastify = fastify;
    }

    public start = async () => {
        try {
            if (this.configsService.serverConfig.SHOW_SWAGGER) {
                await this.swaggerService.registerSwagger(this.fastify);
                console.log(`API Documentation available at http://localhost:3000/documentation`);
            }

            this.routersService.registerRoutes(this.fastify);

            await this.fastify.listen({ port: 3000 });
            console.log(`Server listening at 3000`);
        } catch (err) {
            this.fastify.log.error(err);
            process.exit(1);
        }
    };
}
