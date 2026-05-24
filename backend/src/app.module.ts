import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './shared/config/app.config';
import databaseConfig from './shared/config/database.config';
import { UserModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
