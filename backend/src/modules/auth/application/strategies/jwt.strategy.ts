import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from '../../types/jwt-payload.type';
import { NullableType } from '@/src/shared/types/nullable.type';
import { AppConfigType } from '@/src/shared/config/app-config.type';
import { AuthConfigType } from '../../config/auth-config.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<AppConfigType & AuthConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('auth.secret', { infer: true }),
    });
  }

  // Why we don't check if the user exists in the database:
  // https://github.com/brocoders/nestjs-boilerplate/blob/main/docs/auth.md#about-jwt-strategy
  public validate(payload: JwtPayloadType): NullableType<JwtPayloadType> {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
