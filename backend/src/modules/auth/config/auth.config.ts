import { registerAs } from '@nestjs/config';
import ms from 'ms';

import { IsString } from 'class-validator';
import validateConfig from '@/src/shared/utils/validate-config';
import { AuthConfig } from '@/src/modules/auth/config/auth-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secret: process.env.AUTH_JWT_SECRET,
    expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN as ms.StringValue,
  };
});
