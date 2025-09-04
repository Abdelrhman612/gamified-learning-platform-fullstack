import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { Participation } from '@prisma/client';

@Injectable()
export class ParticipationsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create new participation with a transaction
  async participate(
    challengeId: string,
    createDto: CreateParticipationDto,
  ): Promise<Participation> {
    return this.prisma.$transaction(async (tx) => {
      // Step 1: Check if the user exists
      const user = await tx.user.findUnique({
        where: { id: createDto.userId },
      });

      if (!user) {
        throw new BadRequestException(
          `User with ID ${createDto.userId} not found.`,
        );
      }

      // Step 2: Check if the challenge exists
      const challenge = await tx.challenge.findUnique({
        where: { id: challengeId },
      });

      if (!challenge) {
        throw new NotFoundException(
          `Challenge with ID ${challengeId} not found.`,
        );
      }

      // Step 3: Check if user already participated in this challenge
      const existingParticipation = await tx.participation.findFirst({
        where: {
          userId: createDto.userId,
          challengeId: challengeId,
        },
      });

      if (existingParticipation) {
        throw new BadRequestException(
          `User already participated in this challenge.`,
        );
      }

      // Step 4: Create the participation record
      const newParticipation = await tx.participation.create({
        data: {
          ...createDto,
          challengeId,
        },
      });

      // Step 5: Increment the participantsCount of the challenge
      await tx.challenge.update({
        where: { id: challengeId },
        data: {
          participantsCount: {
            increment: 1,
          },
        },
      });
      await tx.user.update({
        where: { id: createDto.userId },
        data: {
          points: {
            increment: challenge.points,
          },
        },
      });
      await tx.participation.update({
        where: { id: newParticipation.id },
        data: {
          awardedPoints: {
            increment: challenge.points,
          },
          status: {
            set: 'completed',
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
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new NotFoundException(
        `Challenge with ID ${challengeId} not found.`,
      );
    }

    return this.prisma.participation.findMany({
      where: { challengeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            points: true,
          },
        },
      },
    });
  }
  // Get participations of a user
  async getParticipationsByUser(userId: string): Promise<Participation[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    return this.prisma.participation.findMany({
      where: { userId },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
            points: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
