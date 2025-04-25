import { tokenJWTConfig } from 'src/configs/TokenJWT.config';
import { tokenService } from 'src/domains/_shared/token/token.service';

const LoginService = () => {
    const logic = () => {
        const accessToken = tokenService.sign(
            {
                user_id: '123',
                token_type: 'ACCESS_TOKEN',
            },
            '1d',
            tokenJWTConfig.JWT_CMS_AUD,
        );
        const refreshToken = tokenService.sign(
            {
                user_id: '123',
                token_type: 'REFRESH_TOKEN',
            },
            '1d',
            tokenJWTConfig.JWT_CMS_AUD,
        );
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    };

    return {
        logic,
    };
};

export const loginService = LoginService();
