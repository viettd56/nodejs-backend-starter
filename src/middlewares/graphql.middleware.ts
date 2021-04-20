import { GraphQLError, GraphQLFormattedError } from 'graphql';
import _ from 'lodash';
import ExceptionCode from 'src/exeptions/ExceptionCode';
import { appLogger } from 'src/logger';
import { IMobileContext } from 'src/types';
import { ICradle } from 'src/container';

interface Request {
    headers: {
        'accept-language': string;
        authorization: string;
    };
}

const UNKNOW_ERROR_MESSAGE = 'Có lỗi xảy ra, quý khách vui lòng thử lại sau!';

interface CustomGraphQLFormattedError extends GraphQLFormattedError {
    error_code: number;
}

interface Request {
    headers: {
        'accept-language': string;
        authorization: string;
    };
}

export const GraphQLMiddleware = ({ graphQLConfig, dataloaders }: ICradle) => {
    const formatError = (error: GraphQLError): CustomGraphQLFormattedError => {
        const DEBUG_GRAPHQL = graphQLConfig.DEBUG_GRAPHQL;

        let message = UNKNOW_ERROR_MESSAGE;
        if (DEBUG_GRAPHQL || _.get(error.extensions, 'exception.code')) {
            message = error.message;
        }
        appLogger.error(JSON.stringify(error, null, 2));
        return {
            message,
            locations: DEBUG_GRAPHQL ? error.locations : undefined,
            path: DEBUG_GRAPHQL ? error.path : undefined,
            extensions: DEBUG_GRAPHQL ? error.extensions : undefined,
            error_code: _.get(error.extensions, 'exception.code')
                ? _.get(error.extensions, 'exception.code')
                : ExceptionCode.UNKNOWN,
        };
    };

    const createMobileContext = async ({ req }: { req: Request }) => {
        const accessToken = req.headers['authorization'];

        const context: IMobileContext = {
            dataloaders,
            accessToken,
        };

        try {
            // let mongooseConnection = getConnectionToDB(serverData.database_name);
            // const token         = req.headers.authorization;
            if (accessToken) {
            }
        } catch (error) {
            appLogger.error(error);
        }

        return context;
    };

    return {
        formatError,
        createMobileContext,
    };
};
