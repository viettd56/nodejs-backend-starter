import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigsModule } from 'src/configs/configs.module';
import { UserRepository } from './data/User/user.repository';

@Module({
    providers: [DatabaseService, UserRepository],
    exports: [DatabaseService, UserRepository],
    imports: [ConfigsModule],
})
export class DatabaseModule {}
