import express from 'express';
import { serverConfig } from 'src/configs/Server.config';
import { tokenJWTConfig } from 'src/configs/TokenJWT.config';
import { Exception } from 'src/exceptions/Exception';
import { tokenHelper } from 'src/helpers/Token.helper';
const InternalMiddleware = () => {
    const auth: express.RequestHandler = async (req, res, next) => {
        try {
            const apiKey = req.headers['x-api-key'];
            if (!apiKey) {
                throw new Exception('API key is required');
            }
            if (apiKey !== serverConfig.INTERNAL_API_KEY) {
                throw new Exception('Invalid token');
            }
            next();
        } catch (error) {
            next(error);
            return;
        }
    };

    const checkIPs: express.RequestHandler = async (req, res, next) => {
        try {
            const ip = req.ip ?? '';
            const _internalIps = serverConfig.INTERNAL_IPS;
            if (_internalIps !== '*') {
                const internalIpAddresses = serverConfig.INTERNAL_IPS.split(';');
                if (!internalIpAddresses.includes(ip)) {
                    throw new Exception('Invalid IP');
                }
            }
            next();
        } catch (error) {
            next(error);
            return;
        }
    };

    return {
        auth,
        checkIPs,
    };
};

export const internalMiddleware = InternalMiddleware();
