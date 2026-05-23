import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);
  await app.close();
};

runSeed()
  .then(() => {
    console.log('✅️ Run seed completed!');
    process.exit(0);
  })
  .catch(() => {
    console.log('❌ Run seed failed!');
    process.exit(0);
  });
