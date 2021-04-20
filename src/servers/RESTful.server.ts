import compress from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { appLogger } from 'src/logger';
import { ICradle } from 'src/container';

export const RESTfulServer = ({ restfulRouter, httpMiddleware, restfulConfig }: ICradle) => {
    return {
        listen() {
            const app = express();

            app.use(cors());
            app.use(express.json());
            app.use(express.urlencoded({ extended: true, limit: '10mb' }));
            app.use(helmet());
            app.use(compress());

            if (restfulConfig.DEBUG_RESTFUL) {
                app.use(morgan('Express HTTP: :method :url :status :res[content-length] - :response-time ms'));
            }

            app.use(httpMiddleware.checkDatabase());

            app.use(restfulRouter.router);

            app.use(httpMiddleware.errorHandle());

            app.use(httpMiddleware.notFound());

            const server = http.createServer(app);
            return new Promise((resolve, reject) => {
                try {
                    server.listen(restfulConfig.RESTFUL_PORT, () => {
                        appLogger.info(`🚀 Server RESTful ready at http://localhost:${restfulConfig.RESTFUL_PORT}`);
                        resolve();
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};
