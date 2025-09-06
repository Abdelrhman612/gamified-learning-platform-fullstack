import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { AuthModule } from './Auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChallengeModule } from './challenge/challenge.module';
import { GeminiModule } from './gemini/gemini.module';
import { ParticipationsModule } from './participations/participations.module';
import { AppController } from './app.controller';
import { config } from './config/config.service';
const configService = new ConfigService();
const jwtSecret = configService.get<string>('JWT_SECRET');
const jwtExpires = configService.get<string>('JWT_EXPIRES');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production.local'
          : '.env.development.local',
      load: [config],
    }),
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpires || '1S' },
    }),
    UserModule,
    ChallengeModule,
    AuthModule,
    GeminiModule,
    ParticipationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
