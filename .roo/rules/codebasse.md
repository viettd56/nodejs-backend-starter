## Module Data Update Rule

For all modules structured similarly to [`src/user`](src/user/user.module.ts:1):

- Data updates to the model must be performed through the corresponding Entity class (e.g., [`src/user/user.entity.ts`](src/user/user.entity.ts:1)).
- Persistence of changes must be handled exclusively via the Repository class (e.g., [`src/user/user.repository.ts`](src/user/user.repository.ts:1)).
- Direct updates to the model outside the Entity/Repository pattern are prohibited.
- This ensures encapsulation, validation, and consistency for all domain data operations.
