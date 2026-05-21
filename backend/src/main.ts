import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './shared/types/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);
  const host = 'localhost';
  const port = configService.getOrThrow('app.port', { infer: true });
  const appName = configService.getOrThrow('app.name', { infer: true });

  await app.listen(port);

  return {
    appName: appName,
    url: `http://${host}:${port}`,
  };
}
bootstrap()
  .then(({ appName, url }) => {
    console.log(appName);
    console.log(`Server run on ${url}`);
  })
  .catch((e: Error) => {
    console.log('Server run failed');
    console.error(e.message);
  });
