import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RETRY_CHANGE_USERNAME_MAX_ATTEMPTS } from '../constant';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}
  async execute(user: User): Promise<User> {
    const isEmailExists = await this.repository.existsEmail(user.email);

    if (isEmailExists) {
      throw new UnprocessableEntityException('Email đã tồn tại');
    }

    let attempts = 0;
    while (true) {
      const username = user.generateUsernameFromEmail(user.email);
      const isUsernameExists = await this.repository.existsUsername(username);

      if (!isUsernameExists) {
        user.changeUsername(username);
        break;
      }

      attempts++;
      if (attempts >= RETRY_CHANGE_USERNAME_MAX_ATTEMPTS) {
        throw new HttpException(
          'Tạo user thất bại, vui lòng thử lại sau',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    user.hashPassword();

    return await this.repository.createUser(user);
  }
}
