import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../useCases/create-user-use-case';
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
    const users = await this.repository.findAll();
    return users.map((item) => UserMapper.toDto(item));
  }

  async create(dto: CreateUserRequestDto) {
    const user = await this.createUser.execute(UserMapper.toDomain(dto));
    return UserMapper.toDto(user);
  }
}
