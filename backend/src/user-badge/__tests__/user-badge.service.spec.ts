import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeService } from '../user-badge.service';

import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';

type MockPrismaService = {
  userBadge: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
    create: jest.Mock;
    delete: jest.Mock;
  };
};
describe('UserBadgeService', () => {
  let service: UserBadgeService;
  let prisma: MockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBadgeService,
        {
          provide: PrismaService,
          useValue: {
            userBadge: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserBadgeService>(UserBadgeService);
    prisma = module.get(PrismaService);
  });

  describe('getUserBadges', () => {
    it('should return badges for a user', async () => {
      const userId = 'user1';
      const badges = [{ id: '1', userId, badge: { id: 'b1', name: 'Gold' } }];
      prisma.userBadge.findMany.mockResolvedValue(badges as any);

      const result = await service.getUserBadges(userId);

      expect(result).toEqual(badges);
      expect(prisma.userBadge.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: { badge: true },
      });
    });
  });

  describe('getUserBadgeById', () => {
    it('should return a userBadge by id', async () => {
      const userBadge = {
        id: '1',
        userId: 'u1',
        badgeId: 'b1',
        badge: { id: 'b1', name: 'Gold' },
      };
      prisma.userBadge.findUnique.mockResolvedValue(userBadge as any);

      const result = await service.getUserBadgeById('1');

      expect(result).toEqual(userBadge);
    });

    it('should throw NotFoundException if userBadge not found', async () => {
      prisma.userBadge.findUnique.mockResolvedValue(null);

      await expect(service.getUserBadgeById('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('awardBadge', () => {
    it('should create and return a userBadge', async () => {
      const userBadge = {
        id: '1',
        userId: 'u1',
        badgeId: 'b1',
        badge: { id: 'b1', name: 'Gold' },
      };
      prisma.userBadge.create.mockResolvedValue(userBadge as any);

      const result = await service.awardBadge('u1', 'b1');

      expect(result).toEqual(userBadge);
      expect(prisma.userBadge.create).toHaveBeenCalledWith({
        data: { userId: 'u1', badgeId: 'b1' },
        include: { badge: true },
      });
    });
  });

  describe('deleteUserBadge', () => {
    it('should delete a userBadge successfully', async () => {
      prisma.userBadge.findUnique.mockResolvedValue({ id: '1' } as any);
      prisma.userBadge.delete.mockResolvedValue({} as any);

      const result = await service.deleteUserBadge('1');

      expect(result).toEqual({
        message: 'UserBadge with id 1 deleted successfully',
      });
      expect(prisma.userBadge.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if userBadge does not exist', async () => {
      prisma.userBadge.findUnique.mockResolvedValue(null);

      await expect(service.deleteUserBadge('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
