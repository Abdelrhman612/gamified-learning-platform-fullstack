/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeController } from '../user-badge.controller';
import { UserBadgeService } from '../user-badge.service';
import { AwardBadgeDto } from '../dto/award-badge.dto';
import { JwtService } from '@nestjs/jwt';

describe('UserBadgeController', () => {
  let controller: UserBadgeController;
  let service: jest.Mocked<UserBadgeService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBadgeController],
      providers: [
        {
          provide: UserBadgeService,
          useValue: {
            getUserBadges: jest.fn(),
            getUserBadgeById: jest.fn(),
            awardBadge: jest.fn(),
            deleteUserBadge: jest.fn(),
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

    controller = module.get<UserBadgeController>(UserBadgeController);
    service = module.get(UserBadgeService);
  });

  describe('getUserBadges', () => {
    it('should return all badges for a user', async () => {
      const userId = 'u1';
      const badges = [{ id: '1', userId, badge: { id: 'b1', name: 'Gold' } }];
      service.getUserBadges.mockResolvedValue(badges as []);

      const result = await controller.getUserBadges(userId);

      expect(result).toEqual(badges);
    });
  });

  describe('getUserBadgeById', () => {
    it('should return a userBadge by id', async () => {
      const userBadge = {
        id: '1',
        userId: 'u1',
        badge: {
          id: 'b1',
          name: 'Gold',
          iconUrl: '',
          createdAt: new Date(),
        },
      };

      service.getUserBadgeById.mockResolvedValue(userBadge as any);

      const result = await controller.getUserBadgeById('1');

      expect(result).toEqual(userBadge);
    });
  });

  describe('awardBadge', () => {
    it('should award a badge to a user', async () => {
      const dto: AwardBadgeDto = { userId: 'u1', badgeId: 'b1' };
      const awarded = {
        id: '1',
        userId: 'u1',
        badgeId: 'b1',
        badge: { id: 'b1', name: 'Gold' },
      };

      service.awardBadge.mockResolvedValue(awarded as any);

      const result = await controller.awardBadge(dto);

      expect(result).toEqual(awarded);
    });
  });

  describe('deleteUserBadge', () => {
    it('should delete a userBadge successfully', async () => {
      const response = { message: 'UserBadge with id 1 deleted successfully' };
      service.deleteUserBadge.mockResolvedValue(response);

      const result = await controller.deleteUserBadge('1');

      expect(result).toEqual(response);
    });
  });
});
