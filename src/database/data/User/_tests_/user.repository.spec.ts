// src/user/user.repository.spec.ts

import { UserRepository } from '../user.repository';
import { UserModel } from '../user.model';
import { UserEntity } from '../user.entity';
import { Exception } from 'src/shared/helpers/Exception.helper';

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let mockTransaction: any;

    beforeEach(() => {
        userRepository = new UserRepository();
        mockTransaction = { LOCK: { UPDATE: 'UPDATE' } };
        jest.clearAllMocks();
    });

    describe('update', () => {
        it('should update user and return true', async () => {
            const userEntity = {
                toObject: jest.fn().mockReturnValue({
                    id: '1',
                    name: 'Test',
                    has_transaction_lock: false,
                    email: 'test@example.com',
                    password: 'pass',
                    username: 'testuser',
                    extra_data: {},
                }),
            } as any;

            jest.spyOn(UserModel, 'update').mockResolvedValue([1] as any);

            const result = await userRepository.update(userEntity);
            expect(UserModel.update).toHaveBeenCalledWith(
                {
                    name: 'Test',
                    email: 'test@example.com',
                    password: 'pass',
                    username: 'testuser',
                    extra_data: {},
                },
                {
                    where: { id: '1' },
                    transaction: undefined,
                },
            );
            expect(result).toBe(true);
        });

        it('should throw if has_transaction_lock is true and no transaction', async () => {
            const userEntity = {
                toObject: jest.fn().mockReturnValue({
                    id: '1',
                    name: 'Test',
                    has_transaction_lock: true,
                    email: 'test@example.com',
                    password: 'pass',
                    username: 'testuser',
                    extra_data: {},
                }),
            } as any;

            await expect(userRepository.update(userEntity)).rejects.toThrow(Exception);
        });
    });

    describe('findById', () => {
        it('should return UserEntity if found', async () => {
            const mockModel = {};
            jest.spyOn(UserModel, 'findByPk').mockResolvedValue(mockModel as any);
            const modelToEntitySpy = jest.spyOn(UserEntity, 'modelToEntity').mockReturnValue('entity' as any);

            const result = await userRepository.findById('1');
            expect(UserModel.findByPk).toHaveBeenCalledWith('1');
            expect(modelToEntitySpy).toHaveBeenCalledWith(mockModel, { has_transaction_lock: false });
            expect(result).toBe('entity');
        });

        it('should throw if user not found', async () => {
            jest.spyOn(UserModel, 'findByPk').mockResolvedValue(null as any);
            await expect(userRepository.findById('1')).rejects.toThrow(Exception);
        });
    });

    describe('findByIdWithLock', () => {
        it('should return UserEntity with lock if found', async () => {
            const mockModel = {};
            jest.spyOn(UserModel, 'findByPk').mockResolvedValue(mockModel as any);
            const modelToEntitySpy = jest.spyOn(UserEntity, 'modelToEntity').mockReturnValue('entity' as any);

            const result = await userRepository.findByIdWithLock('1', mockTransaction);
            expect(UserModel.findByPk).toHaveBeenCalledWith('1', {
                transaction: mockTransaction,
                lock: mockTransaction.LOCK.UPDATE,
            });
            expect(modelToEntitySpy).toHaveBeenCalledWith(mockModel, { has_transaction_lock: true });
            expect(result).toBe('entity');
        });

        it('should throw if user not found', async () => {
            jest.spyOn(UserModel, 'findByPk').mockResolvedValue(null as any);
            await expect(userRepository.findByIdWithLock('1', mockTransaction)).rejects.toThrow(Exception);
        });
    });

    describe('create', () => {
        it('should create user and return result', async () => {
            const userEntity = {
                toObject: jest.fn().mockReturnValue({
                    id: '1',
                    name: 'Test',
                    has_transaction_lock: false,
                    extra_data: {},
                    email: 'test@example.com',
                    password: 'pass',
                    username: 'testuser',
                }),
            } as any;

            const mockResult = { id: '1' };
            jest.spyOn(UserModel, 'create').mockResolvedValue(mockResult as any);

            const result = await userRepository.create(userEntity);
            expect(UserModel.create).toHaveBeenCalledWith(
                {
                    id: '1',
                    name: 'Test',
                    extra_data: {},
                    email: 'test@example.com',
                    password: 'pass',
                    username: 'testuser',
                },
                { transaction: undefined },
            );
            expect(result).toBe(mockResult);
        });

        it('should throw if has_transaction_lock is true and no transaction', async () => {
            const userEntity = {
                toObject: jest.fn().mockReturnValue({
                    id: '1',
                    name: 'Test',
                    has_transaction_lock: true,
                    extra_data: {},
                    email: 'test@example.com',
                    password: 'pass',
                    username: 'testuser',
                }),
            } as any;

            await expect(userRepository.create(userEntity)).rejects.toThrow(Exception);
        });
    });
});
