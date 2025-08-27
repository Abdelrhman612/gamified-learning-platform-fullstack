import { Test, TestingModule } from '@nestjs/testing';
import { BadgeController } from '../badge.controller';
import { BadgeService } from '../badge.service';
import { CreateBadgeDto } from '../dto/create-badge.dto';
import { UpdateBadgeDto } from '../dto/update-badge.dto';
import { BageType } from '../type/badge.type';
import { JwtService } from '@nestjs/jwt';

describe('BadgeController', () => {
  let controller: BadgeController;
  let service: jest.Mocked<BadgeService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadgeController],
      providers: [
        {
          provide: BadgeService,
          useValue: {
            getBadges: jest.fn(),
            getBadgeById: jest.fn(),
            createBadge: jest.fn(),
            updateBadge: jest.fn(),
            deleteBadge: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BadgeController>(BadgeController);
    service = module.get(BadgeService);
  });

  describe('getAllBadges', () => {
    it('should return all badges', async () => {
      const badges = [{ id: '1', name: 'Gold' }];
      service.getBadges.mockResolvedValue(badges as []);

      const result = await controller.getAllBadges();

      expect(result).toEqual(badges);
    });
  });

  describe('getBadgeById', () => {
    it('should return a badge by id', async () => {
      const badge = {
        id: '1',
        name: 'Gold',
        iconUrl: '',
        createdAt: new Date(),
      };
      service.getBadgeById.mockResolvedValue(badge as BageType);

      const result = await controller.getBadgeById('1');

      expect(result).toEqual(badge);
    });
  });

  describe('createBadge', () => {
    it('should create a new badge', async () => {
      const dto: CreateBadgeDto = { name: 'Gold' } as CreateBadgeDto;
      const badge = { id: '1', ...dto } as CreateBadgeDto;

      service.createBadge.mockResolvedValue(badge as BageType);

      const result = await controller.createBadge(dto);

      expect(result).toEqual(badge);
    });
  });

  describe('updateBadge', () => {
    it('should update a badge', async () => {
      const dto: UpdateBadgeDto = { name: 'Silver' } as UpdateBadgeDto;
      const updated = { id: '1', ...dto } as UpdateBadgeDto;

      service.updateBadge.mockResolvedValue(updated as BageType);

      const result = await controller.updateBadge('1', dto);

      expect(result).toEqual(updated);
    });
  });

  describe('deleteBadge', () => {
    it('should delete a badge', async () => {
      const response = { message: 'Badge with id 1 deleted successfully' };

      service.deleteBadge.mockResolvedValue(response);

      const result = await controller.deleteBadge('1');

      expect(result).toEqual(response);
    });
  });
});
