import { UserService } from '@/src/modules/users/application/services/users.service';
import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from '../../presentation/dtos/register-request.dto';
import { AuthMapper } from '../mappers/auth.mapper';
import { UserDto } from '@/src/modules/users/presentation/dtos/user.dto';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userService: UserService) {}
  async execute(dto: RegisterRequestDto): Promise<UserDto> {
    const user = this.userService.create(AuthMapper.toDto(dto));
    return user;
  }
}
