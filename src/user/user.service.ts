import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { UserEntity } from './user.entity';
import { TokenService } from 'src/token/token.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly userRepository: UserRepository,
    ) {}
    public genToken = ({
        user_id,
        access_token_expires_in,
        refresh_token_expires_in,
        aud,
    }: {
        user_id: string;
        access_token_expires_in: string;
        refresh_token_expires_in: string;
        aud: string;
    }) => {
        const accessToken = this.tokenService.sign(
            {
                user_id,
                token_type: 'ACCESS_TOKEN',
            },
            access_token_expires_in,
            aud,
        );
        const refreshToken = this.tokenService.sign(
            {
                user_id,
                token_type: 'REFRESH_TOKEN',
            },
            refresh_token_expires_in,
            aud,
        );
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    };

    public newUser = async (
        {
            name,
            email,
            password,
            username,
        }: {
            email?: string;
            name: string;
            username?: string;
            password: string;
        },
        {
            transaction,
        }: {
            transaction?: Transaction;
        } = {},
    ) => {
        const userEntity = new UserEntity(
            {
                id: UserEntity.newId(),
                name,
                email: email || null,
                password: await UserEntity.hashPassword(password),
                extra_data: {},
                username: username || null,
            },
            {
                has_transaction_lock: !!transaction,
            },
        );
        return this.userRepository.create(userEntity, transaction);
    };
}
