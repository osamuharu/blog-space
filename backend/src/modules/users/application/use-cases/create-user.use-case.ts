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

    for (let i = 0; i < RETRY_CHANGE_USERNAME_MAX_ATTEMPTS; i++) {
      const isUsernameExists = await this.repository.existsUsername(
        user.username,
      );

      if (!isUsernameExists) {
        user.hashPassword();
        return await this.repository.createUser(user);
      }

      const newUsername = user.generateUsernameFromEmail(user.email);

      user.changeUsername(newUsername);
    }

    throw new HttpException(
      'Tạo user thất bại, vui lòng thử lại sau',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
