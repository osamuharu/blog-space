import { UserService } from '@/src/modules/users/application/services/users.service';
import { User } from '@/src/modules/users/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from '../../presentation/dtos/register-request.dto';
import { AuthMapper } from '../mappers/auth.mapper';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userService: UserService) {}
  async execute(dto: RegisterRequestDto): Promise<User> {
    const user = this.userService.create(AuthMapper.toDto(dto));
    return user;
  }
}
