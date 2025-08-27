import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';

@Injectable()
export class UserBadgeService {
  constructor(private prisma: PrismaService) {}

  async getUserBadges(userId: string) {
    return this.prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
    });
  }

  async getUserBadgeById(id: string) {
    const userBadge = await this.prisma.userBadge.findUnique({
      where: { id },
      include: { badge: true },
    });
    if (!userBadge)
      throw new NotFoundException(`UserBadge with id ${id} not found`);
    return userBadge;
  }

  async awardBadge(userId: string, badgeId: string) {
    return this.prisma.userBadge.create({
      data: { userId, badgeId },
      include: { badge: true },
    });
  }

  async deleteUserBadge(id: string) {
    const userBadge = await this.prisma.userBadge.findUnique({ where: { id } });
    if (!userBadge)
      throw new NotFoundException(`UserBadge with id ${id} not found`);
    await this.prisma.userBadge.delete({ where: { id } });
    return { message: `UserBadge with id ${id} deleted successfully` };
  }
}
