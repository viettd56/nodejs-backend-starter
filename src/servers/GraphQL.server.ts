import { RedisCache } from 'apollo-server-cache-redis';
import { ApolloServer } from 'apollo-server-express';
import compress from 'compression';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { makeExecutableSchema } from 'graphql-tools';
import helmet from 'helmet';
import { ICradle } from 'src/container';
import { appLogger } from 'src/logger';

const GRAPHQL_QUERY_DEPTH_LIMIT = 10;

export const GraphQLServer = ({
    httpMiddleware,
    graphQLMiddleware,
    serverGraphQLMobileSchema,
    graphQLConfig,
    databaseConfig,
}: ICradle) => {
    return {
        listen() {
            const schemaMobileGraphql = makeExecutableSchema({
                typeDefs: serverGraphQLMobileSchema.typeDefs,
                resolvers: serverGraphQLMobileSchema.resolvers,
                schemaDirectives: {
                    log: serverGraphQLMobileSchema.directiveResolvers.log,
                },
            });

            const serverMobileGraphql = new ApolloServer({
                schema: schemaMobileGraphql,
                debug: graphQLConfig.DEBUG_GRAPHQL,
                tracing: graphQLConfig.DEBUG_GRAPHQL,
                playground: graphQLConfig.GRAPHQL_PLAYGROUND,
                validationRules: [depthLimit(GRAPHQL_QUERY_DEPTH_LIMIT)],
                formatError: graphQLMiddleware.formatError,
                context: graphQLMiddleware.createMobileContext,
                uploads: true,
                persistedQueries: {
                    cache: new RedisCache({
                        host: databaseConfig.REDIS_CACHE_HOST,
                        port: databaseConfig.REDIS_CACHE_PORT,
                        password: databaseConfig.REDIS_CACHE_PASSWORD,
                        keyPrefix: databaseConfig.REDIS_CACHE_PREFIX,
                    }),
                },
            });

            const app = express();

            app.use(express.json());
            app.use(compress());
            app.use(cors());
            app.use(helmet());

            // -----------------------------------------------------------------------------

            app.use(httpMiddleware.defaultAcceptLanguage());
            app.use(httpMiddleware.checkDatabase());

            // -----------------------------------------------------------------------------

            serverMobileGraphql.applyMiddleware({ app, path: '/mobile' });

            return new Promise((resolve, reject) => {
                try {
                    app.listen(
                        {
                            port: graphQLConfig.GRAPHQL_PORT,
                        },
                        () => {
                            appLogger.info(`🚀 Server GraphQL ready at http://localhost:${graphQLConfig.GRAPHQL_PORT}`);
                            resolve();
                        },
                    );
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};
