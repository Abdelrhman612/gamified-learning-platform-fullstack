import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { Participation, Prisma } from '@prisma/client';

@Injectable()
export class ParticipationsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create new participation with a transaction
  async participate(
    challengeId: string,
    createDto: CreateParticipationDto,
  ): Promise<Participation> {
    return this.prisma.$transaction(async (tx) => {
      // Step 1: Check if the challenge exists
      const challenge = await tx.challenge.findUnique({
        where: { id: challengeId },
      });

      if (!challenge) {
        throw new NotFoundException(
          `Challenge with ID ${challengeId} not found.`,
        );
      }

      // Step 2: Create the participation record
      const newParticipation = await tx.participation.create({
        data: {
          ...createDto,
          challengeId,
        },
      });

      // Step 3: Increment the participantsCount of the challenge
      await tx.challenge.update({
        where: { id: challengeId },
        data: {
          participantsCount: {
            increment: 1,
          },
        },
      });

      return newParticipation;
    });
  }

  // Get participations of a challenge
  async getParticipationsByChallenge(
    challengeId: string,
  ): Promise<Participation[]> {
    return this.prisma.participation.findMany({
      where: { challengeId },
      include: { user: true },
    });
  }

  // Get a single participation by ID
  async getParticipationById(id: string): Promise<Participation | null> {
    return this.prisma.participation.findUnique({
      where: { id },
      include: { user: true, challenge: true },
    });
  }

  // Update participation
  async updateParticipation(
    id: string,
    updateDto: UpdateParticipationDto,
  ): Promise<Participation> {
    try {
      return await this.prisma.participation.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Participation with ID ${id} not found.`);
      }
      throw error;
    }
  }

  // Get participations of a user
  async getParticipationsByUser(userId: string): Promise<Participation[]> {
    return this.prisma.participation.findMany({
      where: { userId },
      include: { challenge: true },
    });
  }
}
