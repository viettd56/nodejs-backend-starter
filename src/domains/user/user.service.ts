import { tokenService } from '../token/token.service';

const UserService = () => {
    const genToken = ({
        user_id,
        access_token_expires_in,
        refresh_token_expires_in,
        aud,
    }: {
        user_id: string;
        access_token_expires_in: string;
        refresh_token_expires_in: string;
        aud: string;
    }) => {
        const accessToken = tokenService.sign(
            {
                user_id,
                token_type: 'ACCESS_TOKEN',
            },
            access_token_expires_in,
            aud,
        );
        const refreshToken = tokenService.sign(
            {
                user_id,
                token_type: 'REFRESH_TOKEN',
            },
            refresh_token_expires_in,
            aud,
        );
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    };

    return { genToken };
};

export const userService = UserService();
