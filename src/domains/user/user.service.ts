import { UserModel } from 'src/models/data/User.model';
import { tokenService } from '../token/token.service';
import { bcryptHelper } from 'src/helpers/Bcrypt.helper';
import { Transaction } from 'sequelize';

const UserService = () => {
    const genToken = ({
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
        const accessToken = tokenService.sign(
            {
                user_id,
                token_type: 'ACCESS_TOKEN',
            },
            access_token_expires_in,
            aud,
        );
        const refreshToken = tokenService.sign(
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

    const newUser = async (
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
        const user = await UserModel.create(
            {
                name,
                email,
                password: await bcryptHelper.hashPassword(password),
                extra_data: {},
                username,
            },
            {
                transaction,
            },
        );
        return user;
    };

    return { genToken, newUser };
};

export const userService = UserService();
