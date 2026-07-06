import { NullableType } from '@/src/shared/types/nullable.type';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;

  abstract existsEmail(email: string): Promise<boolean>;

  abstract existsUsername(username: string): Promise<boolean>;

  abstract findAll(): Promise<User[]>;

  abstract findByEmail(email: string): Promise<NullableType<User>>;
}
