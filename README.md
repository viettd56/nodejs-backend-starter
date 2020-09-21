# NodeJS Backend Starter

NodeJS Backend with Typescript, Docker, GraphQL, RESTful, Dependency Injection, Microservices, MongoDB, Redis, ...

## Overview

This is template for server NodeJS

-   Language: [Typescript](https://github.com/microsoft/TypeScript)
-   API:

    -   GraphQL API: [
        Apollo Server](https://github.com/apollographql/apollo-server)
    -   RESTful API: [
        ExpressJS](https://github.com/expressjs/express)

-   Database:

    -   MongoDB: [Mongoose](https://github.com/Automattic/mongoose)
    -   Redis: [ioredis](https://github.com/luin/ioredis)

-   Microservices:

    -   [Moleculer](https://github.com/moleculerjs/moleculer)

-   Dependency Injection Structure:

    -   [Awilix](https://github.com/jeffijoe/awilix)

-   Linter:

    -   [TSLint](https://github.com/palantir/tslint)

-   Unit Test:

    -   [Jest](https://github.com/facebook/jest)

-   Internationalization:

    -   [i18next](https://github.com/i18next/i18next)

-   Job Queue:

    -   [Bull](https://github.com/OptimalBits/bull)

-   Load environment:

    -   [DotENV](https://github.com/motdotla/dotenv)

-   Batching:

    -   [Dataloader](https://github.com/graphql/dataloader)

-   Codegen:

    -   [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)

-   Seed DB:

    -   [Mongo Seeding](https://github.com/pkosiec/mongo-seeding)

-   Process Manager:

    -   [PM2](https://github.com/Unitech/pm2)

-   Validator

    -   [Joi](https://github.com/sideway/joi)

## Install Dependencies

```
yarn
```

## Create env file

```
cp .env.example .env
```

WARNING: Change environment private and secret key when run production

## Auto Codegen

```
yarn watch
```

## Start server dev

```
yarn dev
```

## Testing

```
yarn test
```

## Build Release

```
yarn build
```

## Build Docker container

```
docker build .
```

## Project anatomy

```
node_modules (generated)         → NPM dependencies
locales:                            → Internationalization files
src:                                → Application sources
 └ caches                              → Redis cache
 └ commands                              → Application scipts
 └ configs                              → Application environment configs
 └ dataloaders                              → Application batching
 └ domains                              → Application business rules
 └ exceptions                              → Application exception codes
 └ generated (generated)                              → GraphQL-codegen
 └ graphqls (generated)                              → GraphQL API schema and resolvers
 └ helpers                           → Application helpers code
 └ jobs                           → Application job queue
 └ logger                           → Application log helper
 └ middlewares                           → GraphQL and RESTful middleware
 └ restful                           → RESTful API
 └ seed                           → Seed MongoDB
 └ servers                           → Application server
 └ setups                           → Application setups when start
 └ container.ts                           → Awilix container
 └ index.ts                           → Main application entry point
 └ jest.helper.ts                           → Helper for jest test
 └ runJobs.ts                           → Start job process
 └ seedDB.ts                           → Script for seeding MongoDB
 └ types.ts                           → Code types
.env.example                    → Example environment file
.env.test                    → Rnvironment for test
.eslintrc.js                    → ESLint Config
.prettierrc.js                   → Prettier Config
codegen-watch.yml                   → GraphQL codegen config when dev
codegen.yml                   → GraphQL codegen config when build
docker-compose.dev.yml                   → Dockercompose file start MongoDB and Redis for dev
Dockerfile                  → Dockerfile for build docker container
ecosystem.config.js                  → PM2 config when run prod
ecosystem.config.dev.js                  → PM2 config when run dev
gulpfile.js                  → Gulp scripts
jest.config.js                  → Jest config file
tsconfig.json                 → Typescript config file
tsconfig.dev.json                 → Typescript config file when dev
ttsconfig.json                 → Typescript config file when build release
```
