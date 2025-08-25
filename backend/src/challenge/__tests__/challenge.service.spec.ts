import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/DataBase/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { ChallengeService } from '../challenge.service';
import { CreateChallengeDto } from '../dto/create-challenge-dto';
import { UpdateChallengeDto } from '../dto/update-challenge-dto';

// Mock data
const mockChallenge = {
  id: 'mockId1',
  title: 'Mock Challenge 1',
  description: 'A test description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaService = {
  challenge: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ChallengeService', () => {
  let service: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
  });

  // A basic test to ensure the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getChallenges', () => {
    it('should return an array of challenges', async () => {
      const result = [mockChallenge];
      mockPrismaService.challenge.findMany.mockResolvedValue(result);

      expect(await service.getChallenges()).toEqual(result);
    });
  });

  describe('getChallengeById', () => {
    it('should return a single challenge when a valid ID is provided', async () => {
      mockPrismaService.challenge.findUnique.mockResolvedValue(mockChallenge);

      expect(await service.getChallengeById('mockId1')).toEqual(mockChallenge);
    });

    it('should throw NotFoundException if challenge is not found', async () => {
      mockPrismaService.challenge.findUnique.mockResolvedValue(null);
      await expect(service.getChallengeById('invalidId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createChallenge', () => {
    const newChallengeDto = {
      title: 'New Challenge',
      description: 'A new test challenge',
    };
    const createdChallenge = { id: 'newId', ...newChallengeDto };

    it('should create and return a new challenge', async () => {
      mockPrismaService.challenge.findFirst.mockResolvedValue(null);
      mockPrismaService.challenge.create.mockResolvedValue(createdChallenge);

      expect(
        await service.createChallenge(newChallengeDto as CreateChallengeDto),
      ).toEqual(createdChallenge);
    });

    describe('updateChallenge', () => {
      const updateData = { title: 'Updated Title' };
      const updatedChallenge = { ...mockChallenge, ...updateData };

      it('should update and return the challenge', async () => {
        mockPrismaService.challenge.findUnique.mockResolvedValue(mockChallenge);
        mockPrismaService.challenge.update.mockResolvedValue(updatedChallenge);

        expect(
          await service.updateChallenge(
            'mockId1',
            updateData as UpdateChallengeDto,
          ),
        ).toEqual(updatedChallenge);
      });

      it('should throw NotFoundException if challenge to update is not found', async () => {
        mockPrismaService.challenge.findUnique.mockResolvedValue(null);

        await expect(
          service.updateChallenge(
            'invalidId',
            updateData as UpdateChallengeDto,
          ),
        ).rejects.toThrow(NotFoundException);
      });
    });

    describe('deleteChallenge', () => {
      it('should delete a challenge and return a success message', async () => {
        mockPrismaService.challenge.findUnique.mockResolvedValue(mockChallenge);
        mockPrismaService.challenge.delete.mockResolvedValue(mockChallenge);

        expect(await service.deleteChallenge('mockId1')).toEqual({
          message: 'Challenge with id mockId1 deleted successfully',
        });
      });

      it('should throw NotFoundException if challenge to delete is not found', async () => {
        mockPrismaService.challenge.findUnique.mockResolvedValue(null);

        await expect(service.deleteChallenge('invalidId')).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});
