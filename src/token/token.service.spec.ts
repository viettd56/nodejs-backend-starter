// src/token/token.service.spec.ts

require('dotenv').config();
import { TokenService, Payload } from './token.service';
import { ConfigsService } from '../configs/configs.service';
import jwt from 'jsonwebtoken';
import NodeCache from 'node-cache';

jest.mock('jsonwebtoken');
jest.mock('node-cache');

describe('TokenService', () => {
    let tokenService: TokenService;
    let configsService: ConfigsService;
    let mockCache: { get: jest.Mock; set: jest.Mock };
    const privateKey = Buffer.from('PRIVATE_KEY').toString('base64');
    const publicKey = Buffer.from('PUBLIC_KEY').toString('base64');
    const issuer = 'test-issuer';

    beforeEach(() => {
        configsService = {
            tokenJWTConfig: {
                JWT_PRIVATE_KEY: privateKey,
                JWT_PUBLIC_KEY: publicKey,
                JWT_ISSUER: issuer,
            },
        } as any;

        // Mock NodeCache instance methods
        (NodeCache as any).mockImplementation(() => {
            mockCache = {
                get: jest.fn(),
                set: jest.fn(),
            };
            return mockCache;
        });

        tokenService = new TokenService(configsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('sign', () => {
        it('should sign a token with correct params', () => {
            const payload: Payload = {
                user_id: 'user1',
                token_type: 'ACCESS_TOKEN',
            };
            const signedToken = 'signed.jwt.token';
            (jwt.sign as jest.Mock).mockReturnValue(signedToken);

            const result = tokenService.sign(payload, '2h', 'audience1');

            expect(jwt.sign).toHaveBeenCalledWith(payload, expect.any(String), {
                algorithm: 'RS256',
                expiresIn: '2h',
                audience: 'audience1',
                issuer,
            });
            expect(result).toBe(signedToken);
        });

        it('should throw if privateKey is missing', () => {
            (tokenService as any).privateKey = '';
            expect(() => tokenService.sign({ user_id: 'u', token_type: 'ACCESS_TOKEN' }, '1d', 'aud')).toThrow(
                'jwt private key is undefined',
            );
        });
    });

    describe('verify', () => {
        const token = 'jwt.token';
        const audience = 'audience1';
        const payload: Payload = {
            user_id: 'user2',
            token_type: 'REFRESH_TOKEN',
        };

        it('should return cached payload if present', () => {
            mockCache.get.mockReturnValue(payload);

            const result = tokenService.verify(token, audience);

            expect(mockCache.get).toHaveBeenCalledWith(`token:${token}:${audience}`);
            expect(result).toBe(payload);
            expect(jwt.verify).not.toHaveBeenCalled();
        });

        it('should verify token and cache result if not cached', () => {
            mockCache.get.mockReturnValue(undefined);
            (jwt.verify as jest.Mock).mockReturnValue(payload);

            const result = tokenService.verify(token, audience);

            expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String), {
                algorithms: ['RS256'],
                audience,
                issuer,
            });
            expect(mockCache.set).toHaveBeenCalledWith(`token:${token}:${audience}`, payload);
            expect(result).toBe(payload);
        });

        it('should throw if publicKey is missing', () => {
            (tokenService as any).publicKey = '';
            expect(() => tokenService.verify(token, audience)).toThrow('jwt public key is undefined');
        });
    });
});
