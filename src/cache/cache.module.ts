import { Module } from '@nestjs/common';
import { CacheRepository } from './cache.repository';
import { CacheService } from './cache.service';
import { ConfigsModule } from 'src/configs/configs.module';

@Module({
    providers: [CacheRepository, CacheService],
    exports: [CacheRepository, CacheService],
    imports: [ConfigsModule],
})
export class CacheModule {}
