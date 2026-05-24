import { User } from '../../domain/entities/user.entity';
import { CreateUserRequestDto } from '../../presentation/dtos/create-user-request.dto';
import { UserResponseDto } from '../../presentation/dtos/user-response.dto';

export abstract class UserMapper {
  abstract toDomain(dto: CreateUserRequestDto): User;
  abstract toDto(domain: User): UserResponseDto;
}
