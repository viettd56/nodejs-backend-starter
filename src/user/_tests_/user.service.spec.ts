// src/user/_tests_/user.service.spec.ts
import { UserService } from '../user.service';
import { TokenService } from '../../token/token.service';
import { UserRepository } from '../user.repository';
import { UserEntity } from '../user.entity';

jest.mock('../user.entity');

describe('UserService', () => {
    let userService: UserService;
    let tokenService: jest.Mocked<TokenService>;
    let userRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        tokenService = {
            sign: jest.fn(),
        } as any;

        userRepository = {
            create: jest.fn(),
        } as any;

        userService = new UserService(tokenService, userRepository);
    });

    describe('genToken', () => {
        it('should generate access and refresh tokens', () => {
            tokenService.sign.mockReturnValueOnce('access-token').mockReturnValueOnce('refresh-token');

            const result = userService.genToken({
                user_id: '123',
                access_token_expires_in: '1h',
                refresh_token_expires_in: '7d',
                aud: 'test-aud',
            });

            expect(tokenService.sign).toHaveBeenCalledWith(
                { user_id: '123', token_type: 'ACCESS_TOKEN' },
                '1h',
                'test-aud',
            );
            expect(tokenService.sign).toHaveBeenCalledWith(
                { user_id: '123', token_type: 'REFRESH_TOKEN' },
                '7d',
                'test-aud',
            );
            expect(result).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
            });
        });
    });

    describe('newUser', () => {
        it('should create a new user and call repository', async () => {
            const hashPasswordSpy = jest.spyOn(UserEntity, 'hashPassword').mockResolvedValue('hashed-password');
            const newIdSpy = jest.spyOn(UserEntity, 'newId').mockReturnValue('new-id');

            // Mock a UserModel object as expected by userRepository.create
            const mockUserModel = { id: 'new-id' } as any;
            userRepository.create.mockResolvedValue(mockUserModel);

            const input = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'plain-password',
                username: 'testuser',
            };

            // Mock a Transaction object with required properties
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn(),
                afterCommit: jest.fn(),
                LOCK: {},
            } as any;

            const result = await userService.newUser(input, { transaction: mockTransaction });

            expect(hashPasswordSpy).toHaveBeenCalledWith('plain-password');
            expect(newIdSpy).toHaveBeenCalled();
            expect(userRepository.create).toHaveBeenCalled();
            expect(result).toBe(mockUserModel);
        });
    });
});
