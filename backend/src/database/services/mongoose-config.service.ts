import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createTransactionConnectionFactory } from 'nestjs-mongo-transactions';

import { AllConfigType } from '../../shared/types/config.type';

@Injectable()
export class MongooseCloudConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createMongooseOptions(): MongooseModuleOptions {
    const options: MongooseModuleOptions = {
      uri: this.configService.get('database.url', { infer: true }),
      connectionFactory(connection: Connection) {
        connection.plugin(mongooseAutoPopulate);

        const transactionFactory = createTransactionConnectionFactory();
        return transactionFactory(connection);
      },
    };

    return options;
  }
}

@Injectable()
export class MongooseMemoryConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    const mongoServer = await MongoMemoryServer.create({
      instance: {
        dbName: this.configService.get('database.name', { infer: true }),
        port: this.configService.get('database.port', { infer: true }),
        launchTimeout: 5000,
      },
      auth: {
        customRootName: this.configService.get('database.username', {
          infer: true,
        }),
        customRootPwd: this.configService.get('database.password', {
          infer: true,
        }),
      },
    });

    return {
      uri: mongoServer.getUri(),
      connectionFactory(connection: Connection) {
        connection.plugin(mongooseAutoPopulate);

        const transactionFactory = createTransactionConnectionFactory();
        return transactionFactory(connection);
      },
    };
  }
}
