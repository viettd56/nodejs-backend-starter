import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { MobileRouter } from './mobile/mobile.router';
import { CmsRouter } from './cms/cms.router';
import { CommonRouter } from './common/common.router';

/**
 * Mobile Router provider for NestJS.
 */
@Injectable()
export class RoutersService {
    private _mobileRoutes: FastifyPluginCallback;
    private _cmsRoutes: FastifyPluginCallback;
    private _commonRoutes: FastifyPluginCallback;

    constructor(
        private readonly mobileRouter: MobileRouter,
        private readonly cmsRouter: CmsRouter,
        private readonly commonRouter: CommonRouter,
    ) {
        this._mobileRoutes = this.mobileRouter.mobileRoutes;
        this._cmsRoutes = this.cmsRouter.cmsRoutes;
        this._commonRoutes = this.commonRouter.commonRoutes;
    }

    public get mobileRoutes() {
        return this._mobileRoutes;
    }

    public get cmsRoutes() {
        return this._cmsRoutes;
    }

    public get commonRoutes() {
        return this._commonRoutes;
    }
}
