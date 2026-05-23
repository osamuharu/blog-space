import appConfig from '@/src/shared/config/app.config';
import databaseConfig from '@/src/shared/config/database.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import {
  MongooseCloudConfigService,
  MongooseMemoryConfigService,
} from '../../services/mongoose-config.service';
import { AllConfigType } from '@/src/shared/types/config.type';
import { ENVIROMENT } from '@/src/shared/constant/enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AllConfigType>) => {
        const nodeEnv = configService.getOrThrow('app.nodeEnv', {
          infer: true,
        });

        if (nodeEnv !== ENVIROMENT.PRODUCTION.toString()) {
          const memoryService = new MongooseMemoryConfigService(configService);
          return await memoryService.createMongooseOptions();
        }

        const cloudService = new MongooseCloudConfigService(configService);
        return cloudService.createMongooseOptions();
      },
    }),
  ],
})
export class SeedModule {}
