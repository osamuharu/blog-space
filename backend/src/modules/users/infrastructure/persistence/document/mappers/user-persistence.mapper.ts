import { User } from '@/src/modules/users/domain/entities/user.entity';
import { UserSchemaClass } from '../schemas/users.schema';

export class UserPersistenceMapper {
  static toDomain(schema: UserSchemaClass): User {
    return new User({
      id: schema._id.toString(),
      email: schema.email,
      password: schema.password,
      fullName: schema.fullName,
      username: schema.username,
    });
  }

  static toSchema(domain: User): UserSchemaClass {
    const schema = new UserSchemaClass();

    if (domain.id) {
      schema._id = domain.id;
    }

    if (domain.username) {
      schema.username = domain.username;
    }

    schema.fullName = domain.fullName;
    schema.password = domain.password;
    schema.email = domain.email;

    return schema;
  }
}
