import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { SignInDto, SignUpDto } from './dto/auth.create.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from 'src/utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, password, email } = signUpDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const payload = {
      name: newUser.name,
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = generateToken(this.jwtService, payload);

    return {
      message: 'Registration successful',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      name: user.name,
      id: user.id,
      email: email,
      role: user.role,
    };
    const token = generateToken(this.jwtService, payload);
    return { message: 'Login successful', token: token };
  }
}
