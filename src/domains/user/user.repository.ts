import { Transaction } from 'sequelize';
import { bcryptHelper } from 'src/helpers/Bcrypt.helper';
import { UserModel } from 'src/models/data/User.model';

const UserRepository = () => {
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

    const updateUser = async (
        {
            name,
            id,
        }: {
            id: string;
            name?: string;
        },
        {
            transaction,
        }: {
            transaction?: Transaction;
        } = {},
    ) => {
        const user = await UserModel.findByPk(id, {
            transaction,
            lock: transaction?.LOCK.UPDATE,
        });
        if (!user) {
            throw new Error('User not found');
        }
        if (name !== undefined) {
            user.name = name;
        }
        await user.save({
            transaction,
        });
        return user;
    };

    return {
        newUser,
        updateUser,
    };
};

export const userRepository = UserRepository();
