import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  await app.listen(process.env.PORT || 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}
void bootstrap();
