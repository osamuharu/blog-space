import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

import { AllConfigType } from './shared/types/config.type';
import setupSwagger from './setup-swagger';

import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ENVIROMENT } from './shared/constant/enum';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  const appName = configService.getOrThrow('app.name', { infer: true });
  const backendDomain = configService.getOrThrow('app.backendDomain', {
    infer: true,
  });
  const port = configService.getOrThrow('app.port', { infer: true });
  const nodeEnv = configService.getOrThrow('app.nodeEnv', { infer: true });
  const apiPrefix = configService.getOrThrow('app.apiPrefix', { infer: true });

  app.setGlobalPrefix(apiPrefix);

  if (nodeEnv !== ENVIROMENT.PRODUCTION.toString()) {
    const { url } = setupSwagger(app, configService);
    console.log(`Swagger docs available at ${backendDomain}/${url}`);
  }

  await app.listen(port);

  return {
    name: appName,
    url: `${backendDomain}/${apiPrefix}`,
  };
}
bootstrap()
  .then(({ name, url }) => {
    console.log(name);
    console.log(`Server run on ${url}`);
  })
  .catch((e: Error) => {
    console.log('Server run failed');
    console.error(e.message);
  });
