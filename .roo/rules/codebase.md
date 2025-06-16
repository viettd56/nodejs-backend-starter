## Module Data Update Rule

All modules that manage domain data and business logic must follow these rules, using [`src/user`](src/user/user.module.ts:1) as a reference for module structure:

- Each module must encapsulate its domain logic and data access in a dedicated directory (e.g., `src/user`).
- The module should provide a service class (e.g., [`user.service.ts`](src/user/user.service.ts:1)) that exposes business operations and orchestrates dependencies.
- The module should import and use repository and entity classes from the corresponding data layer (e.g., [`src/database/data/User`](src/database/data/User/user.model.ts:1)).
- The service must not access the database model directly; all persistence must go through the repository, which returns entities.
- The repository must use the model for all database operations and return entities, not raw models.
- The entity class encapsulates all business logic and validation for the domain object.
- The module should be registered as a NestJS module (e.g., [`user.module.ts`](src/user/user.module.ts:1)), importing required dependencies and exporting its service.

### Database Model Structure Rule

For modules following the [`src/database/data/User`](src/database/data/User/user.model.ts:1) pattern:

- Each domain data model must be split into:
    - [`*.model.ts`](src/database/data/User/user.model.ts:1): Defines the Sequelize model/schema.
    - [`*.entity.ts`](src/database/data/User/user.entity.ts:1): Encapsulates business logic and validation.
    - [`*.repository.ts`](src/database/data/User/user.repository.ts:1): Handles all persistence using the Model and returns Entities.
- All data manipulations must go through the Entity and Repository, not directly via the Model.
- The Model is only used by the Repository for database operations.
- The Entity is the only place for business logic and validation.
- The Repository is responsible for all database access and must return Entities, not raw Models.
