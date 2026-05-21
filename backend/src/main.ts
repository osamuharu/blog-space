import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './shared/types/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  const appName = configService.getOrThrow('app.name', { infer: true });
  const backendDomain = configService.getOrThrow('app.backendDomain', {
    infer: true,
  });
  const port = configService.getOrThrow('app.port', { infer: true });

  await app.listen(port);

  return {
    name: appName,
    url: backendDomain,
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
