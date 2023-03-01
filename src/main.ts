import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// PATCH TO FIX A PROBLEM WITH PRISMA AND BIG INT
// https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-1017073129
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
