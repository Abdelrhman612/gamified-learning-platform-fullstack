import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeController } from '../challenge.controller';
import { ChallengeService } from '../challenge.service';
import { CreateChallengeDto } from '../dto/create-challenge-dto';
import { UpdateChallengeDto } from '../dto/update-challenge-dto';
import { AuthGuards } from 'src/Auth/auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

describe('ChallengeController', () => {
  let controller: ChallengeController;

  const mockChallengeService = {
    getChallenges: jest.fn(),
    getChallengeById: jest.fn(),
    createChallenge: jest.fn(),
    updateChallenge: jest.fn(),
    deleteChallenge: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeController],
      providers: [
        {
          provide: ChallengeService,
          useValue: mockChallengeService,
        },
        {
          provide: AuthGuards,
          useValue: { canActivate: jest.fn(() => true) },
        },
        {
          provide: Reflector,
          useValue: { get: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<ChallengeController>(ChallengeController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getChallenges', () => {
    it('should return all challenges', async () => {
      const result = [{ id: '1', title: 'test challenge' }];
      mockChallengeService.getChallenges.mockResolvedValue(result);

      expect(await controller.getChallenges()).toBe(result);
      expect(mockChallengeService.getChallenges).toHaveBeenCalled();
    });
  });

  describe('getChallengeById', () => {
    it('should return one challenge', async () => {
      const result = { id: '1', title: 'test challenge' };
      mockChallengeService.getChallengeById.mockResolvedValue(result);

      expect(await controller.getChallengeById('1')).toBe(result);
      expect(mockChallengeService.getChallengeById).toHaveBeenCalledWith('1');
    });
  });

  describe('createChallenge', () => {
    it('should create a new challenge', async () => {
      const dto: CreateChallengeDto = {
        title: 'new challenge',
      } as CreateChallengeDto;
      const result = { id: '1', ...dto };
      mockChallengeService.createChallenge.mockResolvedValue(result);

      expect(await controller.createChallenge(dto)).toBe(result);
      expect(mockChallengeService.createChallenge).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateChallenge', () => {
    it('should update a challenge', async () => {
      const dto: UpdateChallengeDto = {
        title: 'updated challenge',
      } as UpdateChallengeDto;
      const result = { id: '1', ...dto };
      mockChallengeService.updateChallenge.mockResolvedValue(result);

      expect(await controller.updateChallenge('1', dto)).toBe(result);
      expect(mockChallengeService.updateChallenge).toHaveBeenCalledWith(
        '1',
        dto,
      );
    });
  });

  describe('deleteChallenge', () => {
    it('should delete a challenge', async () => {
      const result = { deleted: true };
      mockChallengeService.deleteChallenge.mockResolvedValue(result);

      expect(await controller.deleteChallenge('1')).toBe(result);
      expect(mockChallengeService.deleteChallenge).toHaveBeenCalledWith('1');
    });
  });
});
