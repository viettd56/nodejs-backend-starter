# System Patterns _Optional_

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.
2025-01-06 17:14:28 - Log of updates made.

## Coding Patterns

- **TypeScript First**: All code written in TypeScript with strict typing
- **Modular Architecture**: Each feature organized in dedicated modules with clear boundaries
- **Dependency Injection**: NestJS IoC container for service management
- **Repository Pattern**: Data access abstraction with dedicated repositories
- **Entity-Repository-Service Pattern**: Clear separation between data entities, repositories, and business services
- **DTO Validation**: Input validation using class-validator decorators
- **Environment Configuration**: Centralized config management with typed configurations
- **Error Handling**: Structured exception handling with custom helpers
- **Domain Separation**: Business logic separated from data layer (e.g., `/user/` vs `/database/data/User/`)

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
- **Test Organization**: Dedicated `_tests_/` directories within each module for better organization
- **Test Naming**: `*.spec.ts` for unit tests, `*.e2e-spec.ts` for end-to-end tests
- **Domain-Specific Testing**: Tests organized by domain (entity tests, repository tests, service tests)

## Project Organization Patterns

- **Domain-Driven Design**: Clear separation between data layer and business logic layer
- **Feature-Based Modules**: Each domain has its own module with complete encapsulation
- **Layered Architecture**: Clear separation between controllers, services, repositories, and entities
- **Data Layer Isolation**: Database entities organized in `/database/data/` with domain-specific folders
- **Business Logic Separation**: Business services in dedicated modules (e.g., `/user/` for user business logic)
- **Configuration Centralization**: All environment configs consolidated in `/configs` directory
- **Utility Helpers**: Shared utilities organized in `/helpers` with specific responsibilities
- **Router Segregation**: API routes separated by client type (CMS vs Mobile) with shared common routes
- **Use Case Pattern**: Business logic encapsulated in dedicated use case files within feature folders
- **Test Co-location**: Test files organized in `_tests_/` directories within each module

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
- **Data Layer Grouping**: Database entities organized by domain in `/database/data/DomainName/`
- **Business Layer Grouping**: Business services organized in dedicated modules (e.g., `/user/`)
- **Nested Organization**: Sub-features organized in nested directories (e.g., `/routers/cms/login/`)
- **Separation of Concerns**: Clear boundaries between infrastructure, business logic, and presentation layers
- **Shared Resources**: Common utilities and schemas in dedicated shared directories
- **Test Co-location**: `_tests_/` directories within each module for better test organization

## Data Access Patterns

- **Entity-Repository Pattern**: Each domain has dedicated entity and repository classes
- **Data Layer Encapsulation**: All database operations encapsulated within repository classes
- **Domain-Specific Data Models**: Each domain has its own data model and entity definitions
- **Repository Interface**: Abstract repository interfaces for better testability and decoupling

## Business Logic Patterns

- **Service Layer Pattern**: Business logic encapsulated in dedicated service classes
- **Use Case Pattern**: Complex business operations organized in use case files
- **Domain Service Separation**: Business services separate from data access layer
- **Module Encapsulation**: Each business domain has its own NestJS module

2025-01-06 17:16:59 - Added project organization and file naming convention patterns
2025-01-16 11:35:00 - Added new patterns for data access, business logic, and updated directory structure patterns
