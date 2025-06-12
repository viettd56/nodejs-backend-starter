// src/user/user.repository.spec.ts

import { UserRepository } from '../user.repository';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from '../user.entity';
import { Exception } from 'src/shared/helpers/Exception.helper';

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let databaseService: jest.Mocked<DatabaseService>;
    let mockTransaction: any;

    beforeEach(() => {
        databaseService = {
            userModel: {
                update: jest.fn(),
                findByPk: jest.fn(),
                create: jest.fn(),
            } as {
                update: jest.Mock;
                findByPk: jest.Mock;
                create: jest.Mock;
            },
        } as any;

        userRepository = new UserRepository(databaseService);
        mockTransaction = { LOCK: { UPDATE: 'UPDATE' } };
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

            (databaseService.userModel.update as jest.Mock).mockResolvedValue([1]);

            const result = await userRepository.update(userEntity);
            expect(databaseService.userModel.update).toHaveBeenCalledWith(
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
            (databaseService.userModel.findByPk as jest.Mock).mockResolvedValue(mockModel);
            const modelToEntitySpy = jest.spyOn(UserEntity, 'modelToEntity').mockReturnValue('entity' as any);

            const result = await userRepository.findById('1');
            expect(databaseService.userModel.findByPk).toHaveBeenCalledWith('1');
            expect(modelToEntitySpy).toHaveBeenCalledWith(mockModel, false);
            expect(result).toBe('entity');
        });

        it('should throw if user not found', async () => {
            (databaseService.userModel.findByPk as jest.Mock).mockResolvedValue(null);
            await expect(userRepository.findById('1')).rejects.toThrow(Exception);
        });
    });

    describe('findByIdWithLock', () => {
        it('should return UserEntity with lock if found', async () => {
            const mockModel = {};
            (databaseService.userModel.findByPk as jest.Mock).mockResolvedValue(mockModel);
            const modelToEntitySpy = jest.spyOn(UserEntity, 'modelToEntity').mockReturnValue('entity' as any);

            const result = await userRepository.findByIdWithLock('1', mockTransaction);
            expect(databaseService.userModel.findByPk).toHaveBeenCalledWith('1', {
                transaction: mockTransaction,
                lock: mockTransaction.LOCK.UPDATE,
            });
            expect(modelToEntitySpy).toHaveBeenCalledWith(mockModel, true);
            expect(result).toBe('entity');
        });

        it('should throw if user not found', async () => {
            (databaseService.userModel.findByPk as jest.Mock).mockResolvedValue(null);
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
            (databaseService.userModel.create as jest.Mock).mockResolvedValue(mockResult);

            const result = await userRepository.create(userEntity);
            expect(databaseService.userModel.create).toHaveBeenCalledWith(
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
