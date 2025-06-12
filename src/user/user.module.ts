import { Module } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { TokenModule } from 'src/token/token.module';
import { ConfigsModule } from 'src/configs/configs.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    providers: [TokenService, UserRepository, UserService],
    exports: [UserService],
    imports: [TokenModule, ConfigsModule, DatabaseModule],
})
export class UserModule {}
