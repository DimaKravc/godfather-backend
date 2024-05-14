import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { nestCsrf } from 'ncsrf';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(cookieParser());
  app.use(nestCsrf());
  app.useStaticAssets(join(__dirname, '..', 'frontend', 'dist'));
  app.setBaseViewsDir(join(__dirname, '..', 'frontend', 'dist'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}

bootstrap();
