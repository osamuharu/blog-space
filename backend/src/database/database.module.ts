import { Module } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ENVIROMENT } from '../shared/constant/enum';
import {
  MongooseCloudConfigService,
  MongooseMemoryConfigService,
} from './services/mongoose-config.service';

import '@nestjs-cls/transactional-adapter-mongoose';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { ClsModule } from 'nestjs-cls';
import { TransactionalAdapterMongoose } from '@nestjs-cls/transactional-adapter-mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { AppConfigType } from '../shared/config/app-config.type';
import { DatabaseConfigType } from './config/database-config.type';

@Module({
  imports: [
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [
            MongooseModule.forRootAsync({
              imports: [ConfigModule.forFeature(databaseConfig)],
              inject: [ConfigService],
              useFactory: async (
                configService: ConfigService<
                  AppConfigType & DatabaseConfigType
                >,
              ) => {
                const nodeEnv = configService.getOrThrow('app.nodeEnv', {
                  infer: true,
                });

                if (nodeEnv !== ENVIROMENT.PRODUCTION.toString()) {
                  const memoryService = new MongooseMemoryConfigService(
                    configService,
                  );
                  return await memoryService.createMongooseOptions();
                }

                const cloudService = new MongooseCloudConfigService(
                  configService,
                );
                return cloudService.createMongooseOptions();
              },
            }),
          ],
          adapter: new TransactionalAdapterMongoose({
            // Pass the generated string token instead of the Connection class
            mongooseConnectionToken: getConnectionToken(),
          }),
        }),
      ],
    }),
  ],
})
export class DatabaseModule {}
