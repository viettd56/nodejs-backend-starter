import { Injectable } from '@nestjs/common';
import { ConfigsService } from 'src/configs/configs.service';
import { UserService } from 'src/user/user.service';

/**
 * Use case for Mobile login.
 */
@Injectable()
export class MobileLoginUsecase {
    constructor(
        private readonly userService: UserService,
        private readonly configsService: ConfigsService,
    ) {}
    public login(id: string): { access_token: string; refresh_token: string } {
        const { access_token, refresh_token } = this.userService.genToken({
            user_id: id,
            access_token_expires_in: '1d',
            refresh_token_expires_in: '7d',
            aud: this.configsService.tokenJWTConfig.JWT_MOBILE_AUD,
        });
        return {
            access_token,
            refresh_token,
        };
    }
}
