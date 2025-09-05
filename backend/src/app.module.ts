import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { AuthModule } from './Auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ChallengeModule } from './challenge/challenge.module';
import { GeminiModule } from './gemini/gemini.module';
import { ParticipationsModule } from './participations/participations.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
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
