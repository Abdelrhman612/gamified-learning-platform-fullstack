import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/DataBase/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ParticipationsService } from '../participations.service';

describe('ParticipationsService', () => {
  let service: ParticipationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipationsService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            challenge: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            participation: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ParticipationsService>(ParticipationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('participate', () => {
    it('✅ should create participation and increment challenge count', async () => {
      const challengeId = 'c1';
      const dto = { userId: 'u1' };

      (prisma.challenge.findUnique as jest.Mock).mockResolvedValue({
        id: challengeId,
        participantsCount: 0,
      });
      (prisma.participation.create as jest.Mock).mockResolvedValue({
        id: 'p1',
        userId: 'u1',
        challengeId,
      });
      (prisma.challenge.update as jest.Mock).mockResolvedValue({
        id: challengeId,
        participantsCount: 1,
      });

      // 🔑 typed callback instead of any
      (prisma.$transaction as jest.Mock).mockImplementation(
        async (cb: (tx: PrismaService) => Promise<unknown>) => {
          return cb(prisma);
        },
      );

      const result = await service.participate(challengeId, dto);

      expect(result).toEqual({ id: 'p1', userId: 'u1', challengeId });
    });

    it('❌ should throw NotFoundException if challenge not found', async () => {
      (prisma.challenge.findUnique as jest.Mock).mockResolvedValue(null);

      (prisma.$transaction as jest.Mock).mockImplementation(
        async (cb: (tx: PrismaService) => Promise<unknown>) => {
          return cb(prisma);
        },
      );

      await expect(service.participate('x', { userId: 'u1' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getParticipationsByChallenge', () => {
    it('should return participations by challengeId', async () => {
      (prisma.participation.findMany as jest.Mock).mockResolvedValue([
        { id: 'p1', challengeId: 'c1' },
      ]);

      const result = await service.getParticipationsByChallenge('c1');

      expect(result).toEqual([{ id: 'p1', challengeId: 'c1' }]);
    });
  });

  describe('getParticipationById', () => {
    it('should return a participation by id', async () => {
      (prisma.participation.findUnique as jest.Mock).mockResolvedValue({
        id: 'p1',
      });

      const result = await service.getParticipationById('p1');

      expect(result).toEqual({ id: 'p1' });
    });
  });

  describe('updateParticipation', () => {
    it('should update a participation', async () => {
      (prisma.participation.update as jest.Mock).mockResolvedValue({
        id: 'p1',
        status: 'APPROVED',
      });

      const result = await service.updateParticipation('p1', {
        status: 'APPROVED',
      });

      expect(result).toEqual({ id: 'p1', status: 'APPROVED' });
    });

    it('should throw NotFoundException if participation not found', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Not found',
        { code: 'P2025', clientVersion: '4.16.0' },
      );

      (prisma.participation.update as jest.Mock).mockRejectedValue(prismaError);

      await expect(
        service.updateParticipation('xx', { status: 'APPROVED' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getParticipationsByUser', () => {
    it('should return participations by userId', async () => {
      (prisma.participation.findMany as jest.Mock).mockResolvedValue([
        { id: 'p1', userId: 'u1' },
      ]);

      const result = await service.getParticipationsByUser('u1');

      expect(result).toEqual([{ id: 'p1', userId: 'u1' }]);
    });
  });
});
