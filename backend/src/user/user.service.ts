import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, points: true },
    });
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, points: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return this.prisma.user.update({
      data: updateUserDto,
      where: { id },
      select: { id: true, name: true, email: true, role: true, points: true },
    });
  }

  async deleteUser(id: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
