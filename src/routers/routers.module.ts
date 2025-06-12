import { Module } from '@nestjs/common';
import { HealthCheckRouter } from './common/healthCheck/healthCheck.router';
import { HealthCheckUsecase } from './common/healthCheck/usecase/health-check.usecase';
import { CmsLoginRouter } from './cms/login/login.router';
import { MobileLoginRouter } from './mobile/login/login.router';
import { CmsLoginUsecase } from './cms/login/usecase/login.usecase';
import { MobileLoginUsecase } from './mobile/login/usecase/login.usecase';
import { UserModule } from 'src/user/user.module';
import { ConfigsModule } from 'src/configs/configs.module';
import { RoutersService } from './routers.service';
import { CmsRouter } from './cms/cms.router';
import { CommonRouter } from './common/common.router';
import { MobileRouter } from './mobile/mobile.router';

@Module({
    providers: [
        HealthCheckRouter,
        HealthCheckUsecase,
        CmsLoginRouter,
        CmsLoginUsecase,
        MobileLoginRouter,
        MobileLoginUsecase,
        RoutersService,
        MobileRouter,
        CmsRouter,
        CommonRouter,
    ],
    exports: [RoutersService],
    imports: [UserModule, ConfigsModule],
})
export class RoutersModule {}
