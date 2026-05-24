import { User } from '@/src/modules/users/domain/entities/user.entity';
import { UserSchemaClass } from '../../schemas/users.schema';
import { UserPersistenceMapper } from '../user-persistence.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPersistenceImpl implements UserPersistenceMapper {
  toDomain(schema: UserSchemaClass): User {
    const domain = new User({
      id: schema._id.toString(),
      email: schema.email,
      password: schema.password,
      fullName: schema.fullName,
      username: schema.username,
    });

    return domain;
  }

  toSchema(domain: User): UserSchemaClass {
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
