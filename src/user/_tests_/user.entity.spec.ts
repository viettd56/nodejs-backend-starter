// src/user/_tests_/user.entity.spec.ts

import { UserEntity } from '../user.entity';
import { UserModel } from 'src/database/data/User.model';

jest.mock('src/shared/helpers/Bcrypt.helper', () => ({
    bcryptHelper: {
        hashPassword: jest.fn(async (password: string) => `hashed_${password}`),
    },
}));

jest.mock('moment-timezone', () => () => ({
    unix: () => 1234567890,
}));

jest.mock('lodash', () => ({
    random: () => 12345,
}));

describe('UserEntity', () => {
    // Cast to UserModel to avoid MikroORM property errors
    const baseUserModel = {
        id: 'user-id',
        name: 'Test User',
        username: 'testuser',
        password: 'plainpass',
        email: 'test@example.com',
        extra_data: { foo: 'bar' },
    } as unknown as UserModel;

    it('should construct and return correct object', () => {
        const entity = new UserEntity({
            id: 'user-id',
            name: 'Test User',
            username: 'testuser',
            password: 'plainpass',
            email: 'test@example.com',
            has_transaction_lock: true,
            extra_data: { foo: 'bar' },
        });
        expect(entity.toObject()).toEqual({
            id: 'user-id',
            name: 'Test User',
            username: 'testuser',
            password: 'plainpass',
            email: 'test@example.com',
            has_transaction_lock: true,
            extra_data: { foo: 'bar' },
        });
    });

    it('should create entity from model', () => {
        const entity = UserEntity.modelToEntity(baseUserModel, false);
        expect(entity.toObject()).toMatchObject({
            id: baseUserModel.id,
            name: baseUserModel.name,
            username: baseUserModel.username,
            password: baseUserModel.password,
            email: baseUserModel.email,
            has_transaction_lock: false,
            extra_data: baseUserModel.extra_data,
        });
    });

    it('should hash password with changePassword', async () => {
        const entity = new UserEntity({
            ...baseUserModel,
            has_transaction_lock: false,
        });
        await entity.changePassword('newpass');
        expect(entity.toObject().password).toBe('hashed_newpass');
    });

    it('should hash password with static hashPassword', async () => {
        const hashed = await UserEntity.hashPassword('abc123');
        expect(hashed).toBe('hashed_abc123');
    });

    it('should generate new id with newId', () => {
        const id = UserEntity.newId();
        expect(id).toBe('U123456789012345');
    });
});
