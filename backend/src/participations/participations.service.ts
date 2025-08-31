import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

      return newParticipation;
    });
  }

  // Get participations of a challenge
  async getParticipationsByChallenge(
    challengeId: string,
  ): Promise<Participation[]> {
    // التحقق من وجود التحدي أولاً
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
      },
    });
  }

  // Get a single participation by ID
  async getParticipationById(id: string): Promise<Participation | null> {
    const participation = await this.prisma.participation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        challenge: true,
      },
    });

    if (!participation) {
      throw new NotFoundException(`Participation with ID ${id} not found.`);
    }

    return participation;
  }

  // Update participation
  async updateParticipation(
    id: string,
    updateDto: UpdateParticipationDto,
  ): Promise<Participation> {
    try {
      // التحقق من وجود المشاركة أولاً
      const participation = await this.prisma.participation.findUnique({
        where: { id },
      });

      if (!participation) {
        throw new NotFoundException(`Participation with ID ${id} not found.`);
      }

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
    // التحقق من وجود المستخدم أولاً
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

  // دالة مساعدة للتحقق من وجود المستخدم والتحدي
  async validateUserAndChallenge(
    userId: string,
    challengeId: string,
  ): Promise<{ user: any; challenge: any }> {
    const [user, challenge] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.challenge.findUnique({ where: { id: challengeId } }),
    ]);

    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found.`);
    }

    if (!challenge) {
      throw new NotFoundException(
        `Challenge with ID ${challengeId} not found.`,
      );
    }

    return { user, challenge };
  }
}
