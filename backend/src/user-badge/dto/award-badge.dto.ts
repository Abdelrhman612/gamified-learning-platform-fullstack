import { IsNotEmpty, IsString } from 'class-validator';

export class AwardBadgeDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  badgeId: string;
}
