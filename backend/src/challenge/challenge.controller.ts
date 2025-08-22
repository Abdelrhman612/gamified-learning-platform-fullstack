import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge-dto';
import { AuthGuards } from 'src/Auth/auth.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@Controller('challenges')
@UseGuards(AuthGuards)
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}
  @Get()
  getChallenges() {
    return this.challengeService.getChallenges();
  }
  @Get(':id')
  getChallengeById(@Param('id') id: string) {
    return this.challengeService.getChallengeById(id);
  }
  @Post()
  @Roles(['admin'])
  createChallenge(createChallengeDto: CreateChallengeDto) {
    return this.challengeService.createChallenge(createChallengeDto);
  }
  @Post(':id')
  @Roles(['admin'])
  updateChallenge(@Param('id') id: string, updateData: CreateChallengeDto) {
    return this.challengeService.updateChallenge(id, updateData);
  }
  @Delete(':id')
  @Roles(['admin'])
  deleteChallenge(@Param('id') id: string) {
    return this.challengeService.deleteChallenge(id);
  }
}
