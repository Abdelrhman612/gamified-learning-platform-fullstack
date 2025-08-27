import { Module } from '@nestjs/common';
import { UserBadgeService } from './user-badge.service';
import { UserBadgeController } from './user-badge.controller';
import { PrismaModule } from 'src/DataBase/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserBadgeController],
  providers: [UserBadgeService],
})
export class UserBadgeModule {}
