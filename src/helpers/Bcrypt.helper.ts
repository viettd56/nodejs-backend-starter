import bcrypt from 'bcryptjs';

const BcryptHelper = () => {
    const SALT_ROUNDS = 12;
    return {
        hashPassword(password: string): Promise<string> {
            return new Promise((resolve, reject) => {
                bcrypt.hash(password, SALT_ROUNDS, (err, passwordHash) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!passwordHash) {
                        return reject(new Error('Hash password failed'));
                    }
                    return resolve(passwordHash);
                });
            });
        },
        comparePassword(password: string, hashPassword: string): Promise<boolean> {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, hashPassword, (err, same) => {
                    if (err) {
                        return reject(err);
                    }
                    if (typeof same !== 'boolean') {
                        return reject(new Error('Compare password failed'));
                    }
                    return resolve(same);
                });
            });
        },
    };
};

export const bcryptHelper = BcryptHelper();
