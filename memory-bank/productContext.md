# Product Context

This file provides a high-level overview of the project and the expected product that will be created. Initially it is based upon projectBrief.md (if provided) and all other available project-related information in the working directory. This file is intended to be updated as the project evolves, and should be used to inform all other modes of the project's goals and context.
2025-01-06 17:13:40 - Log of updates made will be appended as footnotes to the end of this file.

## Project Goal

This is a NestJS TypeScript starter repository designed to provide a robust foundation for building efficient and scalable server-side applications. The project follows NestJS framework best practices and includes essential enterprise-grade features.

## Key Features

- **Modular Architecture**: Organized with separate modules for different concerns (cache, database, routers, etc.)
- **Authentication System**: JWT-based authentication with separate login endpoints for CMS and mobile
- **Database Integration**: Configured with database models and repositories (User entity)
- **Cache Layer**: Redis-based caching system with dedicated cache service
- **API Documentation**: Swagger integration for API documentation
- **Health Check**: Health check endpoints for monitoring
- **Configuration Management**: Centralized configuration for database, Redis, server, and JWT
- **Testing Setup**: Unit and e2e testing configured with Jest
- **Development Tools**: TypeScript, Prettier, and proper build configuration

## Overall Architecture

- **Framework**: NestJS with TypeScript
- **Package Manager**: pnpm (based on pnpm-lock.yaml)
- **Architecture Pattern**: Modular monolith with clean separation of concerns
- **Database**: Configured with entities and repositories
- **Cache**: Redis integration for performance optimization
- **Authentication**: JWT-based with separate flows for CMS and mobile clients
- **API Structure**: RESTful APIs with proper routing structure
- **Testing**: Comprehensive testing setup with unit and integration tests

## Project Structure

```
server-template-nestjs/
├── src/                          # Main application source code
│   ├── app.module.ts             # Root application module
│   ├── app.service.ts            # Root application service
│   ├── main.ts                   # Application entry point
│   ├── apps/                     # Application entry points (e.g., jobs)
│   │   └── jobs.ts               # Jobs app entry
│   ├── cache/                    # Cache module and services
│   │   ├── cache.module.ts       # Cache module definition
│   │   ├── cache.repository.ts   # Cache repository interface
│   │   ├── cache.service.ts      # Cache service abstraction
│   │   └── redisCache.service.ts # Redis implementation
│   ├── cli/                      # CLI utilities and migrations
│   │   └── migrate/              # Database migration scripts
│   │       └── 0.db.ts           # Initial migration script
│   ├── configs/                  # Configuration management
│   │   ├── configs.module.ts     # Configuration module
│   │   ├── configs.service.ts    # Configuration service
│   │   ├── Database.config.ts    # Database configuration
│   │   ├── Redis.config.ts       # Redis configuration
│   │   ├── Server.config.ts      # Server configuration
│   │   └── TokenJWT.config.ts    # JWT token configuration
│   ├── core/                     # Core framework modules
│   │   ├── core.module.ts        # Core module
│   │   ├── fastify/              # Fastify integration
│   │   │   ├── fastify.module.ts     # Fastify module
│   │   │   ├── fastify.service.ts    # Fastify service
│   │   │   └── fastifyPlugin.service.ts # Fastify plugins
│   │   └── swagger/              # API documentation
│   │       ├── swagger.module.ts     # Swagger module
│   │       └── swagger.service.ts    # Swagger service
│   ├── database/                 # Database module and services
│   │   ├── database.module.ts    # Database module
│   │   ├── database.service.ts   # Database service
│   │   └── data/                 # Data models
│   │       └── User.model.ts     # User data model
│   ├── jobs/                     # Job queue and workers
│   │   ├── JobQueue.config.ts    # Job queue configuration
│   │   ├── jobs.module.ts        # Jobs module
│   │   ├── jobs.service.ts       # Jobs service
│   │   ├── types.d.ts            # Job types definitions
│   │   └── SendRequest/          # SendRequest job handlers
│   │       ├── SendRequest.queue.ts   # Queue definition
│   │       └── SendRequest.worker.ts  # Worker implementation
│   ├── routers/                  # API routing modules
│   │   ├── routers.module.ts     # Main routers module
│   │   ├── routers.service.ts    # Router service
│   │   ├── cms/                  # CMS-specific routes
│   │   │   ├── cms.router.ts         # CMS main router
│   │   │   └── login/                # CMS login functionality
│   │   │       ├── login.router.ts       # CMS login router
│   │   │       └── usecase/
│   │   │           └── login.usecase.ts  # CMS login use case
│   │   ├── common/               # Common/shared routes
│   │   │   ├── common.router.ts      # Common router
│   │   │   └── healthCheck/          # Health check endpoints
│   │   │       ├── healthCheck.router.ts     # Health check router
│   │   │       └── usecase/
│   │   │           └── health-check.usecase.ts # Health check use case
│   │   └── mobile/               # Mobile-specific routes
│   │       ├── mobile.router.ts      # Mobile main router
│   │       └── login/                # Mobile login functionality
│   │           ├── login.router.ts       # Mobile login router
│   │           └── usecase/
│   │               └── login.usecase.ts  # Mobile login use case
│   ├── shared/                   # Shared modules and helpers
│   │   ├── shared.module.ts      # Shared module
│   │   ├── common/               # Common validation schemas
│   │   │   └── common.schema.ts      # Common validation schema
│   │   └── helpers/              # Utility helpers
│   │       ├── Bcrypt.helper.ts      # Password hashing utilities
│   │       ├── Crypto.helper.ts      # Cryptographic utilities
│   │       ├── Exception.helper.ts   # Exception handling
│   │       ├── helpers.module.ts     # Helpers module
│   │       ├── Logger.helper.ts      # Logging utilities
│   │       ├── Other.helper.ts       # Miscellaneous helpers
│   │       └── Validation.helper.ts  # Validation utilities
│   ├── token/                    # JWT token management
│   │   ├── token.module.ts       # Token module
│   │   ├── token.service.spec.ts # Token service tests
│   │   └── token.service.ts      # Token service
│   └── user/                     # User management
│       ├── user.entity.ts        # User entity
│       ├── user.module.ts        # User module
│       ├── user.repository.ts    # User repository
│       └── user.service.ts       # User service
├── test/                         # Test files
│   ├── app.e2e-spec.ts           # End-to-end tests
│   └── jest-e2e.json             # E2E test configuration
├── memory-bank/                  # Project documentation
│   ├── productContext.md         # Project overview and context
│   ├── activeContext.md          # Current status and focus
│   ├── progress.md               # Task progress tracking
│   ├── decisionLog.md            # Architectural decisions
│   └── systemPatterns.md         # Code and design patterns
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Code formatting rules
├── nest-cli.json                 # NestJS CLI configuration
├── package.json                  # Project dependencies
├── pnpm-lock.yaml                # Dependency lock file
├── README.md                     # Project documentation
├── tsconfig.json                 # TypeScript configuration
└── tsconfig.build.json           # Build-specific TypeScript config
```

### Key Architectural Components

1. **Modular Organization**: Clear separation by feature domains (user, cache, database, etc.)
2. **Configuration Management**: Centralized config system with environment-specific settings
3. **Authentication Flow**: Separate login paths for CMS and mobile clients
4. **Data Layer**: Entity-Repository pattern with proper abstraction
5. **API Layer**: Router-based organization with use case pattern
6. **Infrastructure**: Fastify integration, Redis caching, and comprehensive helpers
7. **Documentation**: Swagger integration and Memory Bank system
8. **Testing**: Dedicated test structure with unit and e2e coverage

2025-01-06 17:16:35 - Added detailed project structure and architectural components documentation
