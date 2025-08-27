import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserBadgeService } from './user-badge.service';
import { Roles } from 'src/utils/decorators/role.decorator';
import { AwardBadgeDto } from './dto/award-badge.dto';
import { AuthGuards } from 'src/Auth/auth.guard';

@Controller('user-badges')
@UseGuards(AuthGuards)
export class UserBadgeController {
  constructor(private readonly userBadgeService: UserBadgeService) {}

  @Get('user/:userId')
  async getUserBadges(@Param('userId') userId: string) {
    return this.userBadgeService.getUserBadges(userId);
  }

  @Get(':id')
  async getUserBadgeById(@Param('id') id: string) {
    return this.userBadgeService.getUserBadgeById(id);
  }

  @Post()
  @Roles(['admin'])
  async awardBadge(@Body() dto: AwardBadgeDto) {
    return this.userBadgeService.awardBadge(dto.userId, dto.badgeId);
  }

  @Delete(':id')
  @Roles(['admin'])
  async deleteUserBadge(@Param('id') id: string) {
    return this.userBadgeService.deleteUserBadge(id);
  }
}
