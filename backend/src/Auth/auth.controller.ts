import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MeResponseDto, SignInDto, SignUpDto } from './dto/auth.create.dto';
import { AuthGuards } from './auth.guard';
import { User } from 'src/utils/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { OAuthUser } from './types/auth.types';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

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
  getMe(@User() user: MeResponseDto) {
    return this.authService.getMe(user);
  }
  @Get('github/sign-in')
  @UseGuards(AuthGuard('github'))
  githubSignIn() {
    return { message: 'Redirecting to GitHub for authentication' };
  }
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@User() profile: OAuthUser, @Res() res: Response) {
    const getHubUrl = this.configService.get<string>('CORS_ORIGIN');
    const user = await this.authService.validateOAuthUser(profile);
    const token = user.token;
    return res.redirect(
      `${getHubUrl}/dashboard/user?token=${token}`,
    ) as unknown as Response;
  }
}
