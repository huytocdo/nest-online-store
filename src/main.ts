import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const rootDir = join(__dirname, '..');

  app.useStaticAssets(join(rootDir, 'public'));
  app.setBaseViewsDir(join(rootDir, 'views'));
  hbs.registerPartials(join(rootDir, 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(rootDir, 'views/layouts'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}

bootstrap();
