import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigsModule } from 'src/configs/configs.module';

@Module({
    providers: [TokenService],
    exports: [TokenService],
    imports: [ConfigsModule],
})
export class TokenModule {}
