import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as NodeCache from 'node-cache';
import { ConfigsService } from 'src/configs/configs.service';

/**
 * Payload type for JWT tokens.
 */
export type Payload = {
    user_id: string;
    token_type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN';
};

/**
 * Service for signing and verifying JWT tokens with caching.
 */
@Injectable()
export class TokenService {
    private readonly cache: NodeCache;
    private readonly privateKey: string;
    private readonly publicKey: string;
    private readonly issuer: string;

    constructor(private readonly configsService: ConfigsService) {
        this.privateKey = Buffer.from(this.configsService.tokenJWTConfig.JWT_PRIVATE_KEY, 'base64').toString('utf-8');
        this.publicKey = Buffer.from(this.configsService.tokenJWTConfig.JWT_PUBLIC_KEY, 'base64').toString('utf-8');
        this.issuer = this.configsService.tokenJWTConfig.JWT_ISSUER;
        this.cache = new NodeCache({
            stdTTL: 60,
        });
    }

    /**
     * Sign a JWT token.
     * @param payload The payload to sign.
     * @param expiresIn Expiration time (default: '1d').
     * @param audience Audience for the token.
     * @returns The signed JWT token.
     */
    public sign(payload: Payload, expiresIn: string | number = '1d', audience: string): string {
        if (!this.privateKey) {
            throw new Error('jwt private key is undefined');
        }
        return jwt.sign(payload, this.privateKey, {
            algorithm: 'RS256',
            expiresIn: expiresIn as any,
            audience,
            issuer: this.issuer,
        });
    }

    /**
     * Verify a JWT token with caching.
     * @param token The JWT token to verify.
     * @param audience Audience for the token.
     * @returns The decoded payload.
     */
    public verify(token: string, audience: string): Payload {
        if (!this.publicKey) {
            throw new Error('jwt public key is undefined');
        }
        const cacheKey = `token:${token}:${audience}`;
        const cachedData = this.cache.get<Payload>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const data = jwt.verify(token, this.publicKey, {
            algorithms: ['RS256'],
            audience,
            issuer: this.issuer,
        }) as Payload;

        this.cache.set(cacheKey, data);
        return data;
    }
}
