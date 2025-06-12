import { Injectable } from '@nestjs/common';
// TODO: Replace with actual UserService injection
// import { UserService } from 'src/domains/user/user.service';

/**
 * Use case for CMS login.
 */
@Injectable()
export class CmsLoginUsecase {
    // constructor(private readonly userService: UserService) {}

    public login(): { access_token: string; refresh_token: string } {
        // Replace with actual userService logic
        // const { access_token, refresh_token } = this.userService.genToken({
        //     user_id: '123',
        //     access_token_expires_in: '1d',
        //     refresh_token_expires_in: '7d',
        //     aud: tokenJWTConfig.JWT_CMS_AUD,
        // });
        // return { access_token, refresh_token };

        // Temporary mock implementation
        return {
            access_token: 'mock_access_token',
            refresh_token: 'mock_refresh_token',
        };
    }
}
