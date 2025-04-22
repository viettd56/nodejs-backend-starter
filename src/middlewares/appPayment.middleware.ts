import express from 'express';
import { tokenJWTConfig } from 'src/configs/TokenJWT.config';
import { Exception } from 'src/exceptions/Exception';
import { tokenHelper } from 'src/helpers/Token.helper';
const AppPaymentMiddleware = () => {
    const auth: express.RequestHandler = async (req, res, next) => {
        try {
            // const _token = req.headers.authorization;
            // const token = _token?.split(' ')[1];
            // if (!token) {
            //     throw new Error('Token is required');
            // }
            // const tokenData = tokenHelper(tokenJWTConfig.JWT_AUD).verify(token);
            // res.locals.user_id = tokenData.user_id;
            res.locals.user_id = 'test';
            res.locals.logged = true;
            next();
        } catch (error) {
            next(error);
            return;
        }
    };

    const requireLogin: express.RequestHandler = async (req, res, next) => {
        try {
            if (res.locals.logged === true) {
                next();
                return;
            }
            throw new Exception('Permission denied');
        } catch (error) {
            next(error);
            return;
        }
    };
    return {
        auth,
        requireLogin,
    };
};

export const appPaymentMiddleware = AppPaymentMiddleware();
