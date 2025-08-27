import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/DataBase/prisma.service';
import { BadgeService } from '../badge.service';
import { CreateBadgeDto } from '../dto/create-badge.dto';
import { UpdateBadgeDto } from '../dto/update-badge.dto';
type MockPrismaService = {
  badge: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
    findFirst: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
};

describe('BadgeService', () => {
  let service: BadgeService;
  let prisma: MockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BadgeService,
        {
          provide: PrismaService,
          useValue: {
            badge: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BadgeService>(BadgeService);
    prisma = module.get(PrismaService);
  });

  describe('getBadges', () => {
    it('should return all badges', async () => {
      const badges = [{ id: '1', name: 'Gold' }];
      prisma.badge.findMany.mockResolvedValue(badges);

      const result = await service.getBadges();

      expect(result).toEqual(badges);
    });
  });

  describe('getBadgeById', () => {
    it('should return a badge if found', async () => {
      const badge = { id: '1', name: 'Gold' };
      prisma.badge.findUnique.mockResolvedValue(badge);

      const result = await service.getBadgeById('1');

      expect(result).toEqual(badge);
      expect(prisma.badge.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw an error if badge not found', async () => {
      prisma.badge.findUnique.mockResolvedValue(null);

      await expect(service.getBadgeById('1')).rejects.toThrow(
        'Badge with id 1 not found',
      );
    });
  });

  describe('createBadge', () => {
    it('should create a new badge if name is unique', async () => {
      const dto: CreateBadgeDto = { name: 'Gold' } as CreateBadgeDto;
      const badge = { id: '1', ...dto };

      prisma.badge.findFirst.mockResolvedValue(null); // name not taken
      prisma.badge.create.mockResolvedValue(badge);

      const result = await service.createBadge(dto);

      expect(result).toEqual(badge);
      expect(prisma.badge.create).toHaveBeenCalledWith({ data: dto });
    });

    it('should throw an error if badge name already exists', async () => {
      const dto: CreateBadgeDto = { name: 'Gold' } as CreateBadgeDto;
      prisma.badge.findFirst.mockResolvedValue({ id: '1', ...dto });

      await expect(service.createBadge(dto)).rejects.toThrow(
        'Badge with name Gold already exists',
      );
    });
  });

  describe('updateBadge', () => {
    it('should update a badge if exists', async () => {
      const dto: UpdateBadgeDto = { name: 'Silver' };
      const badge = { id: '1', name: 'Gold' };
      const updated = { id: '1', ...dto };

      prisma.badge.findUnique.mockResolvedValue(badge);
      prisma.badge.update.mockResolvedValue(updated);

      const result = await service.updateBadge('1', dto);

      expect(result).toEqual(updated);
      expect(prisma.badge.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: dto,
      });
    });

    it('should throw an error if badge not found', async () => {
      prisma.badge.findUnique.mockResolvedValue(null);

      await expect(
        service.updateBadge('1', { name: 'Silver' }),
      ).rejects.toThrow('Badge with id 1 not found');
    });
  });

  describe('deleteBadge', () => {
    it('should delete a badge if exists', async () => {
      const badge = { id: '1', name: 'Gold' };

      prisma.badge.findUnique.mockResolvedValue(badge);
      prisma.badge.delete.mockResolvedValue(badge);

      const result = await service.deleteBadge('1');

      expect(result).toEqual({
        message: 'Badge with id 1 deleted successfully',
      });
      expect(prisma.badge.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw an error if badge not found', async () => {
      prisma.badge.findUnique.mockResolvedValue(null);

      await expect(service.deleteBadge('1')).rejects.toThrow(
        'Badge with id 1 not found',
      );
    });
  });
});
