import * as awilix from 'awilix';
import dotEnv from 'dotenv';
import fs from 'fs';
import { CacheConfig } from './configs/Cache.config';
import { DatabaseConfig } from './configs/Database.config';
import { GraphQLConfig } from './configs/Graphql.config';
import { RESTfulConfig } from './configs/RESTful.config';
import { ServerConfig } from './configs/Server.config';
import { TokenJWTConfig } from './configs/TokenJWT.config';
import { ConfigWorkspaceCache } from './caches/ConfigWorkspace.cache';
import { SetupService } from './setups';
import { RedisService } from './caches/redis';
import { ServerService } from './servers';
import { RESTfulServer } from './servers/RESTful.server';
import { RESTfulRouter } from './restful/routes';
import { HttpMiddleware } from './middlewares/http.middleware';
import { GraphQLServer } from './servers/GraphQL.server';
import { GraphQLMiddleware } from './middlewares/graphql.middleware';
import { NoteRouter } from './restful/routes/Note.router';
import { ServerHealthRouter } from './restful/routes/ServerHealth.router';
import { ServerGraphQLMobileSchema } from './graphqls/mobile';
import { MobileNoteResolvers } from './graphqls/mobile/typeDefs/Note';
import { JobQueue } from './jobs/JobQueue';
import { JobProcess } from './jobs/JobProcess';
import { MoleculerConfig } from './configs/Moleculer.config';
import { NatsConfig } from './configs/Nats.config';
import { JaegerConfig } from './configs/Jaeger.config';
import { MoleculerService } from './moleculer';
import { MoleculerServiceSchema } from './moleculer/MoleculerServiceSchema';
import { NoteAction } from './moleculer/actions/Note.action';
import { Dataloaders } from './dataloaders';
import { NoteModel } from './domains/notes/Note.model';
import { ServerHealthController } from './domains/server/ServerHealth.controller';
import { NoteRepository } from './domains/notes/Note.repository';
import { NoteUseCase } from './domains/notes/Note.usecase';

export type ICradle = {
    env: { [k: string]: string | undefined };
    cacheConfig: ReturnType<typeof CacheConfig>;
    databaseConfig: ReturnType<typeof DatabaseConfig>;
    graphQLConfig: ReturnType<typeof GraphQLConfig>;
    restfulConfig: ReturnType<typeof RESTfulConfig>;
    serverConfig: ReturnType<typeof ServerConfig>;
    tokenJWTConfig: ReturnType<typeof TokenJWTConfig>;
    configWorkspaceCache: ReturnType<typeof ConfigWorkspaceCache>;
    setupService: ReturnType<typeof SetupService>;
    redisService: ReturnType<typeof RedisService>;
    serverService: ReturnType<typeof ServerService>;
    restfulServer: ReturnType<typeof RESTfulServer>;
    restfulRouter: ReturnType<typeof RESTfulRouter>;
    httpMiddleware: ReturnType<typeof HttpMiddleware>;
    graphQLServer: ReturnType<typeof GraphQLServer>;
    graphQLMiddleware: ReturnType<typeof GraphQLMiddleware>;
    serverHealthController: ReturnType<typeof ServerHealthController>;
    noteRouter: ReturnType<typeof NoteRouter>;
    NoteModel: ReturnType<typeof NoteModel>;
    noteUseCase: ReturnType<typeof NoteUseCase>;
    serverHealthRouter: ReturnType<typeof ServerHealthRouter>;
    serverGraphQLMobileSchema: ReturnType<typeof ServerGraphQLMobileSchema>;
    mobileNoteResolvers: ReturnType<typeof MobileNoteResolvers>;
    jobQueue: ReturnType<typeof JobQueue>;
    jobProcess: ReturnType<typeof JobProcess>;
    moleculerConfig: ReturnType<typeof MoleculerConfig>;
    natsConfig: ReturnType<typeof NatsConfig>;
    jaegerConfig: ReturnType<typeof JaegerConfig>;
    moleculerService: ReturnType<typeof MoleculerService>;
    moleculerServiceSchema: ReturnType<typeof MoleculerServiceSchema>;
    noteAction: ReturnType<typeof NoteAction>;
    dataloaders: ReturnType<typeof Dataloaders>;
    noteRepository: ReturnType<typeof NoteRepository>;
};

export const createAppContainer = (envPath?: string) => {
    const container = awilix.createContainer<ICradle>();

    if (envPath) {
        const envConfig = dotEnv.parse(fs.readFileSync(envPath));
        container.register({
            env: awilix.asValue(envConfig),
        });
    } else {
        container.register({
            env: awilix.asValue(process.env),
        });
    }

    container.register({
        cacheConfig: awilix.asFunction(CacheConfig).singleton(),
        databaseConfig: awilix.asFunction(DatabaseConfig).singleton(),
        graphQLConfig: awilix.asFunction(GraphQLConfig).singleton(),
        restfulConfig: awilix.asFunction(RESTfulConfig).singleton(),
        serverConfig: awilix.asFunction(ServerConfig).singleton(),
        tokenJWTConfig: awilix.asFunction(TokenJWTConfig).singleton(),
        configWorkspaceCache: awilix.asFunction(ConfigWorkspaceCache).singleton(),
        setupService: awilix.asFunction(SetupService).singleton(),
        redisService: awilix.asFunction(RedisService).singleton(),
        serverService: awilix.asFunction(ServerService).singleton(),
        restfulServer: awilix.asFunction(RESTfulServer).singleton(),
        restfulRouter: awilix.asFunction(RESTfulRouter).singleton(),
        httpMiddleware: awilix.asFunction(HttpMiddleware).singleton(),
        graphQLServer: awilix.asFunction(GraphQLServer).singleton(),
        graphQLMiddleware: awilix.asFunction(GraphQLMiddleware).singleton(),
        serverHealthController: awilix.asFunction(ServerHealthController).singleton(),
        noteRouter: awilix.asFunction(NoteRouter).singleton(),
        NoteModel: awilix.asFunction(NoteModel).singleton(),
        noteUseCase: awilix.asFunction(NoteUseCase).singleton(),
        serverHealthRouter: awilix.asFunction(ServerHealthRouter).singleton(),
        serverGraphQLMobileSchema: awilix.asFunction(ServerGraphQLMobileSchema).singleton(),
        mobileNoteResolvers: awilix.asFunction(MobileNoteResolvers).singleton(),
        jobQueue: awilix.asFunction(JobQueue).singleton(),
        jobProcess: awilix.asFunction(JobProcess).singleton(),
        moleculerConfig: awilix.asFunction(MoleculerConfig).singleton(),
        natsConfig: awilix.asFunction(NatsConfig).singleton(),
        jaegerConfig: awilix.asFunction(JaegerConfig).singleton(),
        moleculerService: awilix.asFunction(MoleculerService).singleton(),
        moleculerServiceSchema: awilix.asFunction(MoleculerServiceSchema).singleton(),
        noteAction: awilix.asFunction(NoteAction).singleton(),
        dataloaders: awilix.asFunction(Dataloaders).singleton(),
        noteRepository: awilix.asFunction(NoteRepository).singleton(),
    });

    return container;
};
