import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { OAuthUser } from '../types/auth.types';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
    validateOAuthUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: {} },
        { provide: Reflector, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should call AuthService.signUp and return result', async () => {
      const dto = { name: 'test', email: 'test@test.com', password: '123456' };
      const result = {
        message: 'User created successfully',
        token: 'mockedToken',
        user: { id: '1', name: 'test', email: 'test@test.com' },
      };

      jest.spyOn(service, 'signUp').mockResolvedValue(result);

      const response = await controller.signUp(dto);
      expect(response).toEqual(result);
    });
  });

  describe('signIn', () => {
    it('should call AuthService.signIn and return result', async () => {
      const dto = { email: 'test@test.com', password: '123456' };
      const result = {
        message: 'User created successfully',
        token: 'mockedToken',
        user: { id: '1', email: 'test@test.com', password: ' ' },
      };

      jest.spyOn(service, 'signIn').mockResolvedValue(result);

      const response = await controller.signIn(dto);
      expect(response).toEqual(result);
    });
  });

  describe('getMe', () => {
    it('should return user info from JwtPayload', () => {
      const user = {
        id: '1',
        name: 'test',
        email: 'test@test.com',
        role: 'user',
      };

      const response = controller.getMe(user);

      expect(response).toEqual({
        name: 'test',
        email: 'test@test.com',
        role: 'user',
      });
    });
  });

  describe('githubSignIn', () => {
    it('should return redirect message', () => {
      const response = controller.githubSignIn();
      expect(response).toEqual({
        message: 'Redirecting to GitHub for authentication',
      });
    });
  });

  describe('githubCallback', () => {
    it('should call validateOAuthUser and return user', async () => {
      const req = {
        user: {
          id: 'userId',
          username: 'test',
          email: 'test@test.com',
          accessToken: 'mockedToken',
        },
      };
      const mockOAuthResult = {
        message: 'GitHub authentication successful',
        token: 'mockedToken',
        user: { id: '1', name: 'test', email: 'test@test.com' },
      };

      jest
        .spyOn(service, 'validateOAuthUser')
        .mockResolvedValue(mockOAuthResult);

      const response = await controller.githubCallback(
        req as unknown as OAuthUser,
      );
      expect(response).toEqual({ user: mockOAuthResult });
    });
  });
});
