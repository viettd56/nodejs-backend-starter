import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

type Payload = {
    user_id: string;
    token_type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN';
};

@Injectable()
export class TokenService {
    constructor(
        private private_key: string,
        private public_key: string,
    ) {}

    public sign(payload: Payload, expiresIn: string | number = '1d', audience: string) {
        return jwt.sign(payload, this.private_key, {
            algorithm: 'RS256',
            expiresIn: expiresIn as any,
            audience,
        });
    }
    public verify(token: string, audience: string) {
        const data = jwt.verify(token, this.public_key, {
            algorithms: ['RS256'],
            audience,
        }) as Payload;
        return data;
    }
}
