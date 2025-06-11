import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigsModule } from 'src/configs/configs.module';

@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
    imports: [ConfigsModule],
})
export class DatabaseModule {}
