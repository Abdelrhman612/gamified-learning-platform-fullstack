import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = [
    'https://gamified-learning-platform-fullstac-six.vercel.app',
    'https://gamified-learnin-git-3f6ef5-abdelrhman-aymans-projects-ec59a889.vercel.app',
    'https://gamified-learning-platform-fullstack-4s6u-c3pd3gwxb.vercel.app',
  ];

  app.enableCors({
    origin: (
      origin: string,
      callback: (err: Error | null, allowed: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}

void bootstrap();
