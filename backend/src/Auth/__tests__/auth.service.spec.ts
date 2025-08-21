import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/DataBase/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailsService } from 'src/mails/mails.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { OAuthUser } from '../types/auth.types';
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
jest.mock('src/utils/jwt.util', () => ({
  generateToken: jest.fn().mockReturnValue('mockedToken'),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockMailsService = {
    sendWelcomeEmail: jest.fn(),
  };

  const mockJwtService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: MailsService, useValue: mockMailsService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should register a new user and return token', async () => {
      const dto = { name: 'John', email: 'john@test.com', password: '123' };
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPass');
      mockPrismaService.user.create.mockResolvedValue({
        id: '1',
        name: 'John',
        email: 'john@test.com',
        role: 'user',
      });

      const result = await service.signUp(dto);

      expect(result).toEqual({
        message: 'Registration successful',
        token: 'mockedToken',
        user: { id: '1', name: 'John', email: 'john@test.com' },
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      const dto = { name: 'John', email: 'john@test.com', password: '123' };
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        email: dto.email,
      });

      await expect(service.signUp(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('signIn', () => {
    it('should login successfully with valid credentials', async () => {
      const dto = { email: 'john@test.com', password: '123' };
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        name: 'John',
        email: dto.email,
        password: 'hashedPass',
        role: 'user',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.signIn(dto);

      expect(result).toEqual({
        message: 'Login successful',
        token: 'mockedToken',
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const dto = { email: 'notfound@test.com', password: '123' };
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.signIn(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const dto = { email: 'john@test.com', password: 'wrong' };
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        name: 'John',
        email: dto.email,
        password: 'hashedPass',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signIn(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateOAuthUser', () => {
    it('should throw UnauthorizedException if no email provided', async () => {
      const oauthUser = { username: 'John', email: null } as OAuthUser;
      await expect(service.validateOAuthUser(oauthUser)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should create and return new user if not exists', async () => {
      const oauthUser = { username: 'John', email: 'john@test.com' };
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: '1',
        name: 'John',
        email: 'john@test.com',
        role: 'user',
      });

      const result = await service.validateOAuthUser(oauthUser as OAuthUser);

      expect(result).toEqual({
        message: 'GitHub authentication successful',
        token: 'mockedToken',
        user: { id: '1', name: 'John', email: 'john@test.com' },
      });
    });

    it('should return existing user with token if already exists', async () => {
      const oauthUser = { username: 'John', email: 'john@test.com' };
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        name: 'John',
        email: 'john@test.com',
        role: 'user',
      });

      const result = await service.validateOAuthUser(oauthUser as OAuthUser);

      expect(result).toEqual({
        message: 'GitHub authentication successful',
        token: 'mockedToken',
        user: { id: '1', name: 'John', email: 'john@test.com' },
      });
    });
  });
});
