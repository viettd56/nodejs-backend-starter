import { NextFunction, Request, Response } from 'express'; // tslint:disable-line
import _ from 'lodash';
import ExceptionCode from 'src/exeptions/ExceptionCode';
import { appLogger } from 'src/logger';
const UNKNOW_ERROR_MESSAGE = 'Có lỗi xảy ra, quý khách vui lòng thử lại sau!';

export const HttpMiddleware = () => {
    const bearerToken = () => {
        const headerKey = 'Bearer';

        return function (req: Request, res: Response, next: NextFunction) {
            let token: string | undefined;

            if (req.headers && req.headers.authorization) {
                const authorization: string = req.headers.authorization;

                const parts = authorization.split(' ');
                if (parts.length === 2 && parts[0] === headerKey) {
                    token = parts[1];
                }
            }

            res.locals.token = token;
            next();
        };
    };

    const checkDatabase = () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            next();
        };
    };

    const notFound = () => {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({
                error_code: 404,
                message: 'request not found!',
            });
        };
    };

    const errorHandle = () => {
        return (error: any, req: Request, res: Response, next: NextFunction) => {
            appLogger.error(error);
            if (!_.isNil(error.code)) {
                res.status(400).json({
                    error_code: error.code,
                    message: error.message,
                });
            } else {
                res.status(400).json({
                    error_code: ExceptionCode.SYSTEM_ERROR,
                    message: error.message,
                });
            }
        };
    };

    const defaultAcceptLanguage = () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const acceptLanguage = req.headers['accept-language'] as string;
            if (acceptLanguage !== 'en' && acceptLanguage !== 'vi') {
                req.headers['accept-language'] = 'vi';
            }
            next();
        };
    };

    const consoleLog = async (req: Request, res: Response, next: NextFunction) => {
        let err: Error | null = null;
        try {
            console.log(req.headers);
        } catch (error) {
            err = error;
        }
        next(err);
    };

    return {
        bearerToken,
        checkDatabase,
        notFound,
        errorHandle,
        defaultAcceptLanguage,
        consoleLog,
    };
};
