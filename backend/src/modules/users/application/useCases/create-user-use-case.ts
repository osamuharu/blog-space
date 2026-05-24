import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserRequestDto } from '../../presentation/dtos/create-user-request.dto';
import { UserMapper } from '../mappers/user.mapper';
import { RETRY_CHANGE_USERNAME_MAX_ATTEMPTS } from '../constant';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly mapper: UserMapper,
  ) {}
  async execute(data: CreateUserRequestDto) {
    const isEmailExists = await this.repository.existsEmail(data.email);

    if (isEmailExists) {
      throw new UnprocessableEntityException('Email đã tồn tại');
    }

    const userDomain = this.mapper.toDomain(data);
    userDomain.hashPassword();

    let attempts = 0;
    while (true) {
      const username = userDomain.generateUsernameFromEmail(userDomain.email);
      const isUsernameExists = await this.repository.existsUsername(username);

      if (!isUsernameExists) {
        userDomain.changeUsername(username);
        break;
      }

      attempts++;
      if (attempts >= RETRY_CHANGE_USERNAME_MAX_ATTEMPTS) {
        throw new HttpException(
          'Không thể tạo mới tài khoản do lỗi sinh username tự động. Vui lòng thử lại.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    const user = await this.repository.createUser(userDomain);

    return user;
  }
}
