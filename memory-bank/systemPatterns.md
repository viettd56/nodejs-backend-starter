# System Patterns _Optional_

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.
2025-01-06 17:14:28 - Log of updates made.

## Coding Patterns

- **TypeScript First**: All code written in TypeScript with strict typing
- **Modular Architecture**: Each feature organized in dedicated modules
- **Dependency Injection**: NestJS IoC container for service management
- **Repository Pattern**: Data access abstraction with dedicated repositories
- **DTO Validation**: Input validation using class-validator decorators
- **Environment Configuration**: Centralized config management
- **Error Handling**: Structured exception handling with custom helpers

## Architectural Patterns

- **Clean Architecture**: Separation of concerns with clear boundaries
- **Module-Based Organization**: Feature-driven module structure
- **Service Layer**: Business logic encapsulated in services
- **Controller-Service-Repository**: Clear separation of API, business, and data layers
- **Configuration as Code**: Environment-specific configurations
- **Cache Abstraction**: Redis integration with service abstraction
- **Authentication Strategy**: JWT-based auth with separate flows for different clients

## Testing Patterns

- **Unit Testing**: Jest framework for individual component testing
- **E2E Testing**: End-to-end testing for complete workflows
- **Test Coverage**: Comprehensive test coverage tracking
- **Mock Services**: Test doubles for external dependencies
- **Test Environment**: Isolated testing environment configuration

## Project Organization Patterns

- **Feature-Based Modules**: Each domain (user, cache, database) has its own module with complete encapsulation
- **Layered Architecture**: Clear separation between controllers, services, repositories, and entities
- **Configuration Centralization**: All environment configs consolidated in `/configs` directory
- **Utility Helpers**: Shared utilities organized in `/helpers` with specific responsibilities
- **Router Segregation**: API routes separated by client type (CMS vs Mobile) with shared common routes
- **Use Case Pattern**: Business logic encapsulated in dedicated use case files within feature folders

## File Naming Conventions

- **Modules**: `*.module.ts` for NestJS module definitions
- **Services**: `*.service.ts` for business logic and data operations
- **Controllers/Routers**: `*.router.ts` for API endpoint definitions
- **Entities**: `*.entity.ts` for database entity definitions
- **Models**: `*.model.ts` for data transfer objects and models
- **Configurations**: `*.config.ts` for environment and system configurations
- **Helpers**: `*.helper.ts` for utility functions and shared logic
- **Tests**: `*.spec.ts` for unit tests, `*.e2e-spec.ts` for end-to-end tests

## Directory Structure Patterns

- **Domain Grouping**: Related functionality grouped in domain-specific directories
- **Nested Organization**: Sub-features organized in nested directories (e.g., `/routers/cms/login/`)
- **Separation of Concerns**: Clear boundaries between infrastructure, business logic, and presentation layers
- **Shared Resources**: Common utilities and schemas in dedicated shared directories

2025-01-06 17:16:59 - Added project organization and file naming convention patterns
