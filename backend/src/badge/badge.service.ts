import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Injectable()
export class BadgeService {
  constructor(private prisma: PrismaService) {}

  async getBadges() {
    return this.prisma.badge.findMany();
  }

  async getBadgeById(id: string) {
    const badge = await this.prisma.badge.findUnique({ where: { id } });
    if (!badge) {
      throw new Error(`Badge with id ${id} not found`);
    }
    return badge;
  }

  async createBadge(data: CreateBadgeDto) {
    const existing = await this.prisma.badge.findFirst({
      where: { name: data.name },
    });
    if (existing) {
      throw new Error(`Badge with name ${data.name} already exists`);
    }
    return this.prisma.badge.create({ data });
  }

  async updateBadge(id: string, data: UpdateBadgeDto) {
    const badge = await this.prisma.badge.findUnique({ where: { id } });
    if (!badge) {
      throw new Error(`Badge with id ${id} not found`);
    }
    return this.prisma.badge.update({ where: { id }, data });
  }

  async deleteBadge(id: string) {
    const badge = await this.prisma.badge.findUnique({ where: { id } });
    if (!badge) {
      throw new Error(`Badge with id ${id} not found`);
    }
    await this.prisma.badge.delete({ where: { id } });
    return { message: `Badge with id ${id} deleted successfully` };
  }
}
