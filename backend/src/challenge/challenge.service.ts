import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge-dto';
import { UpdateChallengeDto } from './dto/update-challenge-dto';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}
  async getChallenges() {
    const challenges = await this.prisma.challenge.findMany();
    return challenges;
  }

  async getChallengeById(id: string) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id },
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }
    return challenge;
  }
  async createChallenge(createChallengeDto: CreateChallengeDto) {
    const { title } = createChallengeDto;

    const existingChallenge = await this.prisma.challenge.findFirst({
      where: { title: title },
    });
    if (existingChallenge) {
      throw new Error(`Challenge with name ${title} already exists`);
    }

    const AddChallenge = await this.prisma.challenge.create({
      data: { ...createChallengeDto },
    });
    return AddChallenge;
  }
  async updateChallenge(id: string, updateData: UpdateChallengeDto) {
    const existingChallenge = await this.prisma.challenge.findUnique({
      where: { id },
    });
    if (!existingChallenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }
    const updatedChallenge = await this.prisma.challenge.update({
      where: { id },
      data: updateData,
    });
    return updatedChallenge;
  }
  async deleteChallenge(id: string) {
    const existingChallenge = await this.prisma.challenge.findUnique({
      where: { id },
    });
    if (!existingChallenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }
    await this.prisma.challenge.delete({
      where: { id },
    });
    return { message: `Challenge with id ${id} deleted successfully` };
  }
}
