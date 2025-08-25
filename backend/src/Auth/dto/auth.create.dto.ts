import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class MeResponseDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  role: string;
}
