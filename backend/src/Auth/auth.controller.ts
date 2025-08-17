import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MeResponseDto, SignInDto, SignUpDto } from './dto/auth.create.dto';
import { AuthGuard } from './auth.guard';
import { JwtPayload } from './types/auth.types';
import { User } from 'src/utils/decorators/user.decorator';

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
  @UseGuards(AuthGuard)
  getMe(@User() user: JwtPayload): MeResponseDto {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
