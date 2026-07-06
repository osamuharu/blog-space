import { User } from '../../domain/entities/user.entity';
import { CreateUserRequestDto } from '../../presentation/dtos/create-user-request.dto';
import { UserDto } from '../../presentation/dtos/user.dto';

export class UserMapper {
  static toDomain(dto: CreateUserRequestDto): User {
    const user = new User({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
    });

    return user;
  }

  static toDto(domain: User): UserDto {
    if (domain.id === undefined) {
      throw new Error(
        'User chưa được lưu vào cơ sở dữ liệu, không thể chuyển đổi sang DTO',
      );
    }

    return {
      id: domain.id,
      email: domain.email,
      fullName: domain.fullName,
      username: domain.username,
      password: domain.password,
    };
  }
}
