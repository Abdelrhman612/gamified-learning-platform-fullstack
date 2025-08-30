import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MeResponseDto, SignInDto, SignUpDto } from './dto/auth.create.dto';
import { AuthGuards } from './auth.guard';
import { JwtPayload, OAuthUser } from './types/auth.types';
import { User } from 'src/utils/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Get('me')
  @UseGuards(AuthGuards)
  getMe(@User() user: JwtPayload): MeResponseDto {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  @Get('github/sign-in')
  @UseGuards(AuthGuard('github'))
  githubSignIn() {
    return { message: 'Redirecting to GitHub for authentication' };
  }
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@User() profile: OAuthUser, @Res() res: Response) {
    const user = await this.authService.validateOAuthUser(profile);
    const token = user.token;
    return res.redirect(
      `${process.env.CORS_ORIGIN}/dashboard?token=${token}`,
    ) as unknown as Response;
  }
}
