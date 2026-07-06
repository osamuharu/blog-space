import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

import setupSwagger from './setup-swagger';

import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ENVIROMENT } from './shared/constant/enum';
import validationOptions from './shared/pipes/validation-option.pipe';
import { ResolvePromisesInterceptor } from './shared/interceptors/serializer.interceptor';
import { AppConfigType } from './shared/config/app-config.type';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AppConfigType>);

  const appName = configService.getOrThrow('app.name', { infer: true });
  const backendDomain = configService.getOrThrow('app.backendDomain', {
    infer: true,
  });
  const port = configService.getOrThrow('app.port', { infer: true });
  const nodeEnv = configService.getOrThrow('app.nodeEnv', { infer: true });
  const apiPrefix = configService.getOrThrow('app.apiPrefix', { infer: true });

  app.enableShutdownHooks();
  app.setGlobalPrefix(apiPrefix, { exclude: ['/'] });
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

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
