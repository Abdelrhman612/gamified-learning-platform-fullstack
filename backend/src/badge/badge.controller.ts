import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BadgeService } from './badge.service';

import { Roles } from 'src/utils/decorators/role.decorator';
import { AuthGuards } from 'src/Auth/auth.guard';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Controller('badges')
@UseGuards(AuthGuards)
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  async getAllBadges() {
    return this.badgeService.getBadges();
  }

  @Get(':id')
  async getBadgeById(@Param('id') id: string) {
    return this.badgeService.getBadgeById(id);
  }

  @Post()
  @Roles(['admin'])
  async createBadge(@Body() data: CreateBadgeDto) {
    return this.badgeService.createBadge(data);
  }

  @Patch(':id')
  @Roles(['admin'])
  async updateBadge(@Param('id') id: string, @Body() data: UpdateBadgeDto) {
    return this.badgeService.updateBadge(id, data);
  }

  @Delete(':id')
  @Roles(['admin'])
  async deleteBadge(@Param('id') id: string) {
    return this.badgeService.deleteBadge(id);
  }
}
