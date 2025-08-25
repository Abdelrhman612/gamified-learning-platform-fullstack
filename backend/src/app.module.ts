import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { AuthModule } from './Auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ChallengeModule } from './challenge/challenge.module';
import { GeminiModule } from './gemini/gemini.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
