import { CreateUserRequestDto } from '@/src/modules/users/presentation/dtos/create-user-request.dto';
import { RegisterRequestDto } from '../../presentation/dtos/register-request.dto';

export class AuthMapper {
  static toDto(dto: RegisterRequestDto): CreateUserRequestDto {
    return {
      email: dto.email,
      fullName: dto.email,
      password: dto.password,
    };
  }
}
