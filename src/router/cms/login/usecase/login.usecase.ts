import { tokenJWTConfig } from 'src/configs/TokenJWT.config';
import { userService } from 'src/domains/user/user.service';

const login = () => {
    const { access_token, refresh_token } = userService.genToken({
        user_id: '123',
        access_token_expires_in: '1d',
        refresh_token_expires_in: '7d',
        aud: tokenJWTConfig.JWT_CMS_AUD,
    });
    return {
        access_token,
        refresh_token,
    };
};

export { login };
