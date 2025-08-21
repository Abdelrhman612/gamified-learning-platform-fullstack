import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/DataBase/prisma.module';
import { GithubStrategy } from './strategy/gethub.strategy';
import { MailsModule } from 'src/mails/mails.module';

@Module({
  imports: [MailsModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy],
})
export class AuthModule {}
