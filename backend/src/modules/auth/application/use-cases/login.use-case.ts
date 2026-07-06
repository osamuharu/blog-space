import { UserService } from '@/src/modules/users/application/services/users.service';
import { User } from '@/src/modules/users/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from '../../presentation/dtos/login-request.dto';

@Injectable()
export class LoginUseCase {
  constructor(private readonly userService: UserService) {}
  async execute(dto: LoginRequestDto): Promise<User> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user?.comparePassword(dto.password)) {
      throw new Error('Tài khoản hoặc mật khẩu không chính xác');
    }

    return user;
  }
}
