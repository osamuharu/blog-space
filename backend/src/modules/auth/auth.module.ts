import { AuthController } from './presentation/controllers/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
import { AuthService } from './application/services/auth.service';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { AnonymousStrategy } from './application/strategies/anonymous.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserModule } from '../users/users.module';
import { RegisterUseCase } from './application/use-cases/register.use-case';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    JwtModule.register({}),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AnonymousStrategy,
    LoginUseCase,
    RegisterUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
