import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose'; // <-- Import getConnectionToken
import { AllConfigType } from '../shared/types/config.type';
import { ENVIROMENT } from '../shared/constant/enum';
import {
  MongooseCloudConfigService,
  MongooseMemoryConfigService,
} from './services/mongoose-config.service';

import '@nestjs-cls/transactional-adapter-mongoose';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { ClsModule } from 'nestjs-cls';
import { TransactionalAdapterMongoose } from '@nestjs-cls/transactional-adapter-mongoose';

@Module({
  imports: [
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [
            MongooseModule.forRootAsync({
              inject: [ConfigService],
              useFactory: async (
                configService: ConfigService<AllConfigType>,
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
