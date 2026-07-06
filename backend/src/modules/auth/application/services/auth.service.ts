import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '@/src/modules/users/domain/entities/user.entity';
import { AppConfigType } from '@/src/shared/config/app-config.type';

import { AuthConfigType } from '../../config/auth-config.type';
import { JwtPayloadType } from '../../types/jwt-payload.type';
import { LoginUseCase } from '../use-cases/login.use-case';
import { LoginRequestDto } from '../../presentation/dtos/login-request.dto';
import { LoginResponseDto } from '../../presentation/dtos/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<
      AppConfigType & AuthConfigType
    >,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  public async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.loginUseCase.execute(dto);

    const accessToken = await this.generateAccessToken(user);

    return {
      accessToken,
    };
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayloadType = {
      sub: user.id,
      username: user.username,
    };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('auth.secret', {
        infer: true,
      }),
      expiresIn: this.configService.getOrThrow('auth.expires', {
        infer: true,
      }),
    });
  }
}
