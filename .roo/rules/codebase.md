## Specific to NestJS

### Architecture & Structure

- Use modular architecture. Each domain is a dedicated module under `src/`.
- Each domain module must:
    - Encapsulate its logic and data access in its own directory (e.g., [`src/user`](src/user/user.module.ts:1)).
    - Provide a service class (e.g., [`user.service.ts`](src/user/user.service.ts:1)) for business operations and orchestration.
    - Import and use repository and entity classes from the corresponding data layer (e.g., [`src/database/data/User`](src/database/data/User/user.model.ts:1)).
    - Register as a NestJS module, importing dependencies and exporting its service.

#### Data Layer Pattern

- For each domain data model, split into:
    - [`*.model.ts`](src/database/data/User/user.model.ts:1): Sequelize model/schema definition.
    - [`*.entity.ts`](src/database/data/User/user.entity.ts:1): Encapsulates business logic and validation.
    - [`*.repository.ts`](src/database/data/User/user.repository.ts:1): Handles all persistence using the Model and returns Entities.
- All data manipulations must go through the Entity and Repository, not directly via the Model.
- The Model is only used by the Repository for database operations.
- The Entity is the only place for business logic and validation.
- The Repository is responsible for all database access and must return Entities, not raw Models.
- **Variable and column names in both Entity classes and Model classes must use snake_case.**

#### Controllers

- One controller per main route in each module.
- Additional controllers for secondary routes as needed.
- Controllers should only handle HTTP logic and delegate business logic to services.

#### Core & Shared Modules

- Use a core module for global NestJS artifacts:
    - Global filters for exception handling.
    - Global middlewares for request management.
    - Guards for permission management.
    - Interceptors for request/response management.
- Use a shared module for utilities and logic shared between modules.

### Testing

- Use the standard Jest framework.
- Write unit tests for each public function in services and repositories.
- Write tests for each controller.
- Write end-to-end tests for each API module.
- Add an `admin/test` or similar method to each controller as a smoke test.
