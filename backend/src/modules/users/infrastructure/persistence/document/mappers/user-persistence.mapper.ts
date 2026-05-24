import { User } from '@/src/modules/users/domain/entities/user.entity';
import { UserSchemaClass } from '../schemas/users.schema';

export abstract class UserPersistenceMapper {
  abstract toDomain(schema: UserSchemaClass): User;
  abstract toSchema(domain: User): UserSchemaClass;
}
