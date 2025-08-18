import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/utils/decorators/role.decorator';
import { JwtPayload } from './types/auth.types';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>();
    const authHeaders = request.headers.authorization;
    const token = authHeaders?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }
    try {
      const payload = await this.jwtService.verifyAsync<{
        name: string;
        id: string;
        email: string;
        role: string;
      }>(token, { secret: process.env.JWT_SECRET });
      request['user'] = payload as JwtPayload;

      const roles = this.reflector.get<string[]>(Roles, context.getHandler());
      if (!roles) {
        return true;
      }
      if (!roles.includes(payload.role)) {
        throw new ForbiddenException(
          `You need one of these roles: ${roles.join(', ')}`,
        );
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
