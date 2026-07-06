import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { CreateUserRequestDto } from '../../presentation/dtos/create-user-request.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly repository: UserRepository,
  ) {}

  async findAll() {
    const users = (await this.repository.findAll()).map((user) =>
      UserMapper.toDto(user),
    );
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      return null;
    }

    return UserMapper.toDto(user);
  }

  async create(dto: CreateUserRequestDto) {
    const user = await this.createUser.execute(UserMapper.toDomain(dto));
    return UserMapper.toDto(user);
  }
}
