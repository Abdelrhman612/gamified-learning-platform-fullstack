import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { PrismaModule } from 'src/DataBase/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
