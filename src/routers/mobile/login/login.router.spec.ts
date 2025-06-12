// src/routers/mobile/login/login.router.spec.ts

import { MobileLoginRouter } from './login.router';
import { MobileLoginUsecase } from './usecase/login.usecase';
import Fastify, { FastifyInstance } from 'fastify';

describe('MobileLoginRouter', () => {
    let fastify: FastifyInstance;
    let loginUsecase: MobileLoginUsecase;

    beforeEach(async () => {
        fastify = Fastify();
        loginUsecase = {
            login: jest.fn().mockReturnValue({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
            }),
        } as unknown as MobileLoginUsecase;

        const router = new MobileLoginRouter(loginUsecase);
        fastify.register(router.mobileLoginRoutes);
        await fastify.ready();
    });

    afterEach(async () => {
        await fastify.close();
    });

    it('should return 200 and tokens on valid login', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/',
            payload: { id: 'test-id' },
        });

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.json()).toEqual({
            status: true,
            data: {
                access_token: 'access-token',
                refresh_token: 'refresh-token',
            },
        });
        expect(loginUsecase.login).toHaveBeenCalledWith('test-id');
    });
});

describe('MobileLoginRouter - invalid cases', () => {
    let fastify: FastifyInstance;
    let loginUsecase: MobileLoginUsecase;

    beforeEach(async () => {
        fastify = Fastify();
        loginUsecase = {
            login: jest.fn().mockReturnValue({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
            }),
        } as unknown as MobileLoginUsecase;

        const router = new MobileLoginRouter(loginUsecase);
        fastify.register(router.mobileLoginRoutes);
        await fastify.ready();
    });

    afterEach(async () => {
        await fastify.close();
    });

    it('should return 500 if id is missing (schema validation error)', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/',
            payload: {},
        });
        expect(response.statusCode).toBe(500);
        expect(response.json()).toHaveProperty('message');
    });

    it('should coerce id to string if id is a number (TypeBox behavior)', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/',
            payload: { id: 123 },
        });
        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            status: true,
            data: {
                access_token: 'access-token',
                refresh_token: 'refresh-token',
            },
        });
        expect(loginUsecase.login).toHaveBeenCalledWith('123');
    });

    it('should return 200 with empty object if usecase returns null', async () => {
        (loginUsecase.login as jest.Mock).mockReturnValueOnce(null);
        const response = await fastify.inject({
            method: 'POST',
            url: '/',
            payload: { id: 'test-id' },
        });
        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            status: true,
            data: {},
        });
    });
});
