import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  iconUrl: string;
}
