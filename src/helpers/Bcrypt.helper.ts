import bcrypt from 'bcryptjs';

export const BcryptHelper = () => {
    const SALT_ROUNDS = 12;
    return {
        hashPassword(password: string): Promise<string> {
            return new Promise((resovle, reject) => {
                bcrypt.hash(password, SALT_ROUNDS, (err, passwordHash) => {
                    if (err) {
                        return reject(err);
                    }
                    return resovle(passwordHash);
                });
            });
        },
        comparePassword(password: string, hashPassword: string): Promise<boolean> {
            return new Promise((resovle, reject) => {
                bcrypt.compare(password, hashPassword, (err, same) => {
                    if (err) {
                        return reject(err);
                    }
                    return resovle(same);
                });
            });
        },
    };
};
