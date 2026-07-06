import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRequestDto } from '../dtos/register-request.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Đăng nhập thành công',
    type: [LoginResponseDto],
  })
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Đăng nhập thành công',
    type: [LoginResponseDto],
  })
  async register(@Body() dto: RegisterRequestDto): Promise<void> {
    return this.authService.register(dto);
  }
}
