import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UpdateUserDto } from '../dto/update-user-dto';

describe('UserController', () => {
  let controller: UserController;
  

  const mockUserService = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    updateUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockedToken'),
    verify: jest.fn().mockReturnValue({ userId: '1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);


  });

  describe('getUsers', () => {
    it('should return list of users', async () => {
      const result = [{ id: '1', name: 'John' }];
      mockUserService.getUsers.mockResolvedValue(result);

      const response = await controller.getUsers();
      expect(response).toEqual(result);
    });
  });

  describe('getUser', () => {
    it('should return single user by id', async () => {
      const userId = '1';
      const result = { id: userId, name: 'John' };
      mockUserService.getUser.mockResolvedValue(result);

      const response = await controller.getUser(userId);
      expect(response).toEqual(result);
    });
  });

  describe('updateUser', () => {
    it('should update user and return updated user', async () => {
      const userId = '1';
      const updateDto: Partial<UpdateUserDto> = { name: 'Updated Name' };
      const result = { id: userId, ...updateDto };

      mockUserService.updateUser.mockResolvedValue(result);

      const response = await controller.updateUser(updateDto as UpdateUserDto, userId);
      expect(response).toEqual(result);
    });
  });
});
