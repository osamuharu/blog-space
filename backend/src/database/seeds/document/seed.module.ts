import appConfig from '@/src/shared/config/app.config';
import databaseConfig from '@/src/shared/config/database.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
  ],
})
export class SeedModule {}
