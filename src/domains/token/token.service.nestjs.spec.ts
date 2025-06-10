// src/domains/token/token.service.nestjs.spec.ts
import { TokenService } from './token.service.nestjs';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

const mockPrivateKey = 'mock-private-key';
const mockPublicKey = 'mock-public-key';

const payload = {
    user_id: 'user123',
    token_type: 'ACCESS_TOKEN' as const,
};

describe('TokenService', () => {
    let service: TokenService;

    beforeEach(() => {
        service = new TokenService(mockPrivateKey, mockPublicKey);
        jest.clearAllMocks();
    });

    describe('sign', () => {
        it('should call jwt.sign with correct arguments and return the token', () => {
            const mockToken = 'signed-token';
            (jwt.sign as jest.Mock).mockReturnValue(mockToken);

            const expiresIn = '2h';
            const audience = 'test-audience';
            const result = service.sign(payload, expiresIn, audience);

            expect(jwt.sign).toHaveBeenCalledWith(payload, mockPrivateKey, {
                algorithm: 'RS256',
                expiresIn,
                audience,
            });
            expect(result).toBe(mockToken);
        });

        it('should use default expiresIn if not provided', () => {
            const mockToken = 'signed-token';
            (jwt.sign as jest.Mock).mockReturnValue(mockToken);

            const audience = 'test-audience';
            service.sign(payload, undefined, audience);

            expect(jwt.sign).toHaveBeenCalledWith(payload, mockPrivateKey, {
                algorithm: 'RS256',
                expiresIn: '1d',
                audience,
            });
        });
    });

    describe('verify', () => {
        it('should call jwt.verify with correct arguments and return the payload', () => {
            (jwt.verify as jest.Mock).mockReturnValue(payload);

            const token = 'test-token';
            const audience = 'test-audience';
            const result = service.verify(token, audience);

            expect(jwt.verify).toHaveBeenCalledWith(token, mockPublicKey, {
                algorithms: ['RS256'],
                audience,
            });
            expect(result).toEqual(payload);
        });
    });
});
