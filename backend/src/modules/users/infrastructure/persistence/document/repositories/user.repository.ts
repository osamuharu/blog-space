import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserSchemaClass } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserPersistenceMapper } from '../mappers/user-persistence.mapper';
import { UserRepository } from '@/src/modules/users/domain/repositories/user.repository';
import { User } from '@/src/modules/users/domain/entities/user.entity';

@Injectable()
export class UserDocumentRepository implements UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly model: Model<UserSchemaClass>,
    private readonly mapper: UserPersistenceMapper,
  ) {}

  async existsEmail(email: string): Promise<boolean> {
    const isExists = await this.model.exists({ email });
    return isExists ? true : false;
  }

  async existsUsername(username: string): Promise<boolean> {
    const isExists = await this.model.exists({ username });
    return isExists ? true : false;
  }

  async createUser(user: User): Promise<User> {
    const userModel = new this.model(this.mapper.toSchema(user));
    const userSchema = await userModel.save();
    return this.mapper.toDomain(userSchema);
  }

  async findAll(): Promise<User[]> {
    const userSchemas = await this.model.find();

    return userSchemas.map((item) => this.mapper.toDomain(item));
  }
}
