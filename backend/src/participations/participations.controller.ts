import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { AuthGuards } from 'src/Auth/auth.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@Controller('challenges')
@UseGuards(AuthGuards)
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  //  User participates in a challenge
  @Post(':id/participate')
  async participate(
    @Param('id') challengeId: string,
    @Body() createDto: CreateParticipationDto,
  ) {
    return this.participationsService.participate(challengeId, createDto);
  }

  //  Get all participations in a challenge
  @Get(':id/participations')
  @Roles(['admin'])
  async getChallengeParticipations(@Param('id') challengeId: string) {
    return this.participationsService.getParticipationsByChallenge(challengeId);
  }

  //  Update participation
  @Patch('participations/:id')
  @Roles(['admin'])
  async updateParticipation(
    @Param('id') id: string,
    @Body() updateDto: UpdateParticipationDto,
  ) {
    return this.participationsService.updateParticipation(id, updateDto);
  }

  //  Get all participations of a user
  @Get('users/:id/participations')
  async getUserParticipations(@Param('id') userId: string) {
    return this.participationsService.getParticipationsByUser(userId);
  }
}
