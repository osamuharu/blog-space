import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { CreateUserRequestDto } from '../../../presentation/dtos/create-user-request.dto';
import { UserMapper } from '../user.mapper';
import { UserResponseDto } from '../../../presentation/dtos/user-response.dto';

@Injectable()
export class UserMapperImpl implements UserMapper {
  toDomain(dto: CreateUserRequestDto): User {
    const domain = new User({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
    });

    return domain;
  }

  toDto(domain: User): UserResponseDto {
    const dto = new UserResponseDto();

    if (domain.id) {
      dto.id = domain.id;
    }

    if (domain.username) {
      dto.username = domain.username;
    }

    dto.email = domain.email;
    dto.fullName = domain.fullName;

    return dto;
  }
}
