import crypto from 'crypto';

const IV_LENGTH = 16; // For AES, this is always 16
type algorithm = 'sha1' | 'sha256' | 'md5';

const CryptoHelper = () => {
    return {
        encrypt(text: string, encryptionKey: string) {
            const iv = crypto.randomBytes(IV_LENGTH);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
            let encrypted = cipher.update(text);

            encrypted = Buffer.concat([encrypted, cipher.final()]);

            return iv.toString('hex') + ':' + encrypted.toString('hex');
        },
        decrypt(text: string, encryptionKey: string) {
            const textParts = text.split(':');
            const arr = textParts.shift();
            if (!arr) {
                throw new Error('string decrypt invalid');
            }
            const iv = Buffer.from(arr, 'hex');
            const encryptedText = Buffer.from(textParts.join(':'), 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
            let decrypted = decipher.update(encryptedText);

            decrypted = Buffer.concat([decrypted, decipher.final()]);

            return decrypted.toString();
        },
        createHash(algorithm: algorithm, data: string) {
            return crypto.createHash(algorithm).update(data).digest('hex');
        },
        createHmac(algorithm: algorithm, data: string, secretKey: string) {
            return crypto.createHmac(algorithm, secretKey).update(data).digest('hex');
        },
    };
};

export const cryptoHelper = CryptoHelper();
