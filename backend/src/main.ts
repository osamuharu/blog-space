import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = 'localhost';
  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  return {
    url: `http://${host}:${port}`,
  };
}
bootstrap()
  .then(({ url }) => {
    console.log(`Server run on ${url}`);
  })
  .catch((e: Error) => {
    console.log('Server run failed');
    console.error(e.message);
  });
