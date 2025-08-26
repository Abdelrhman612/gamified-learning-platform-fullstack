import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationsController } from '../participations.controller';
import { ParticipationsService } from '../participations.service';
import { CreateParticipationDto } from '../dto/create-participation.dto';
import { UpdateParticipationDto } from '../dto/update-participation.dto';
import { Participation } from '@prisma/client';
import { AuthGuards } from 'src/Auth/auth.guard';

describe('ParticipationsController', () => {
  let controller: ParticipationsController;
  let service: jest.Mocked<ParticipationsService>;

  const mockParticipation: Participation = {
    id: 'p1',
    userId: 'u1',
    challengeId: 'c1',
    status: 'PENDING',
    createdAt: new Date(),
    awardedPoints: 0,
    submission: null,
    submissionUrl: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationsController],
      providers: [
        {
          provide: ParticipationsService,
          useValue: {
            participate: jest.fn(),
            getParticipationsByChallenge: jest.fn(),
            updateParticipation: jest.fn(),
            getParticipationsByUser: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuards)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ParticipationsController>(ParticipationsController);
    service = module.get(ParticipationsService);
  });

  describe('participate', () => {
    it('should call service and return new participation', async () => {
      const dto: CreateParticipationDto = { userId: 'u1' };
      service.participate.mockResolvedValue(mockParticipation);

      const result = await controller.participate('c1', dto);

      expect(result).toEqual(mockParticipation);
    });
  });

  describe('getChallengeParticipations', () => {
    it('should return participations for a challenge', async () => {
      service.getParticipationsByChallenge.mockResolvedValue([
        mockParticipation,
      ]);

      const result = await controller.getChallengeParticipations('c1');

      expect(result).toEqual([mockParticipation]);
    });
  });

  describe('updateParticipation', () => {
    it('should update and return participation', async () => {
      const updateDto: UpdateParticipationDto = { status: 'APPROVED' };
      const updated = { ...mockParticipation, status: 'APPROVED' };
      service.updateParticipation.mockResolvedValue(updated);

      const result = await controller.updateParticipation('p1', updateDto);

      expect(result).toEqual(updated);
    });
  });

  describe('getUserParticipations', () => {
    it('should return participations for a user', async () => {
      service.getParticipationsByUser.mockResolvedValue([mockParticipation]);

      const result = await controller.getUserParticipations('u1');

      expect(result).toEqual([mockParticipation]);
    });
  });
});
