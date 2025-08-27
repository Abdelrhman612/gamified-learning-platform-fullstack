import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateBadgeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  iconUrl?: string;
}
