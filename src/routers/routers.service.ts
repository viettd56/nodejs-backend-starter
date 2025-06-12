import { Injectable } from '@nestjs/common';
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { MobileRouter } from './mobile/mobile.router';
import { CmsRouter } from './cms/cms.router';
import { CommonRouter } from './common/common.router';

/**
 * Mobile Router provider for NestJS.
 */
@Injectable()
export class RoutersService {
    constructor(
        private readonly mobileRouter: MobileRouter,
        private readonly cmsRouter: CmsRouter,
        private readonly commonRouter: CommonRouter,
    ) {}

    public registerRoutes(app: FastifyInstance) {
        app.register(this.mobileRouter.mobileRoutes, { prefix: '/mobile' });
        app.register(this.cmsRouter.cmsRoutes, { prefix: '/cms' });
        app.register(this.commonRouter.commonRoutes, { prefix: '/' });
    }
}
