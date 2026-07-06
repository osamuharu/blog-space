import { UserService } from '@/src/modules/users/application/services/users.service';
import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from '../../presentation/dtos/login-request.dto';
import bcrypt from 'bcryptjs';
import { UserDto } from '@/src/modules/users/presentation/dtos/user.dto';
@Injectable()
export class LoginUseCase {
  constructor(private readonly userService: UserService) {}
  async execute(dto: LoginRequestDto): Promise<UserDto> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new Error('Tài khoản không tồn tại');
    }

    if (!bcrypt.compareSync(dto.password, user.password)) {
      throw new Error('Tài khoản hoặc mặt khẩu sai');
    }

    return user;
  }
}
