import { bcryptHelper } from 'src/helpers/Bcrypt.helper';
import { UserModel } from 'src/models/data/User.model';

const UserRepository = () => {
    const newUser = async ({
        name,
        email,
        password,
        username,
    }: {
        email: string | null;
        name: string;
        username: string | null;
        password: string;
    }) => {
        const user = await UserModel.create({
            name,
            email,
            password: await bcryptHelper.hashPassword(password),
            extra_data: {},
            username,
        });
        return user;
    };

    return {
        newUser,
    };
};

export const userRepository = UserRepository();
