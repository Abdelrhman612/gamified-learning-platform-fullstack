import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from 'src/DataBase/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user-dto';

describe('UserService', () => {
  let service: UserService;

  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return list of users', async () => {
      const result = [
        { id: '1', name: 'John', email: 'a@a.com', role: 'user', points: 10 },
      ];
      mockPrismaService.user.findMany.mockResolvedValue(result);

      const users = await service.getUsers();
      expect(users).toEqual(result);
    });
  });

  describe('getUser', () => {
    it('should return a user if found', async () => {
      const userId = '1';
      const result = {
        id: userId,
        name: 'John',
        email: 'a@a.com',
        role: 'user',
        points: 10,
      };
      mockPrismaService.user.findUnique.mockResolvedValue(result);

      const user = await service.getUser(userId);
      expect(user).toEqual(result);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = '1';
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.getUser(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateUser', () => {
    it('should update and return user if exists', async () => {
      const userId = '1';
      const updateDto: UpdateUserDto = { name: 'Updated Name' } as UpdateUserDto;
      const existingUser = {
        id: userId,
        name: 'John',
        email: 'a@a.com',
        role: 'user',
        points: 10,
      };
      const updatedUser = { ...existingUser, ...updateDto };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateUser(updateDto, userId);
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = '1';
      const updateDto: UpdateUserDto = { name: 'Updated Name' } as UpdateUserDto;

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.updateUser(updateDto, userId)).rejects.toThrow(NotFoundException);
    });
  });
});
