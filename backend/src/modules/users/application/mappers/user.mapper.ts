import { User } from '../../domain/entities/user.entity';
import { CreateUserRequestDto } from '../../presentation/dtos/create-user-request.dto';
import { UserResponseDto } from '../../presentation/dtos/user-response.dto';

export class UserMapper {
  static toDomain(dto: CreateUserRequestDto): User {
    return new User({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
    });
  }

  static toDto(domain: User): UserResponseDto {
    if (domain.id === undefined || domain.username === undefined) {
      throw new Error('User domain object is missing required properties');
    }

    return {
      id: domain.id,
      email: domain.email,
      fullName: domain.fullName,
      username: domain.username,
    };
  }
}
