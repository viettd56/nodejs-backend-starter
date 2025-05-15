import jwt from 'jsonwebtoken';
import { tokenJWTConfig } from 'src/configs/TokenJWT.config';
import NodeCache from 'node-cache';

type Payload = {
    user_id: string;
    token_type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN';
};
const TokenService = (config: { private_key: string; public_key: string; issuer: string }) => {
    const cache = new NodeCache({
        stdTTL: 60,
    });
    const sign = (payload: Payload, expiresIn: string | number = '1d', audience: string) => {
        if (!config.private_key) {
            throw new Error('jwt secret is undefined');
        }
        return jwt.sign(payload, config.private_key, {
            algorithm: 'RS256',
            expiresIn: expiresIn as any,
            audience,
            issuer: config.issuer,
        });
    };
    const verify = (token: string, audience: string) => {
        if (!config.public_key) {
            throw new Error('jwt secret is undefined');
        }
        const cacheKey = `token:${token}:${audience}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = jwt.verify(token, config.public_key, {
            algorithms: ['RS256'],
            audience,
            issuer: config.issuer,
        }) as Payload;

        cache.set(cacheKey, data);
        return data;
    };

    return {
        sign,
        verify,
    };
};

export const tokenService = TokenService({
    private_key: Buffer.from(tokenJWTConfig.JWT_PRIVATE_KEY, 'base64').toString('utf-8'),
    public_key: Buffer.from(tokenJWTConfig.JWT_PUBLIC_KEY, 'base64').toString('utf-8'),
    issuer: tokenJWTConfig.JWT_ISSUER,
});
