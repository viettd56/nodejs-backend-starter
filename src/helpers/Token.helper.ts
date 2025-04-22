import jwt from 'jsonwebtoken';
import { tokenJWTConfig } from 'src/configs/TokenJWT.config';

type Payload = {
    user_id: string;
    token_type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN';
};

const TokenHelper = () => (audience: string) => {
    return {
        sign(payload: Payload, expiresIn: string | number = '1d') {
            if (!tokenJWTConfig.JWT_PRIVATE_KEY) {
                throw new Error('jwt secret is undefined');
            }
            return jwt.sign(payload, Buffer.from(tokenJWTConfig.JWT_PRIVATE_KEY, 'base64').toString('utf-8'), {
                algorithm: 'RS256',
                expiresIn,
                audience,
                issuer: tokenJWTConfig.JWT_ISSUER,
            });
        },
        verify(token: string) {
            if (!tokenJWTConfig.JWT_PUBLIC_KEY) {
                throw new Error('jwt secret is undefined');
            }
            return jwt.verify(token, Buffer.from(tokenJWTConfig.JWT_PUBLIC_KEY, 'base64').toString('utf-8'), {
                algorithms: ['RS256'],
                audience,
                issuer: tokenJWTConfig.JWT_ISSUER,
            }) as Payload;
        },
    };
};

export const tokenHelper = TokenHelper();
