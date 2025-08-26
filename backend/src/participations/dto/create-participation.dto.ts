import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateParticipationDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  submission?: string;

  @IsOptional()
  @IsUrl()
  submissionUrl?: string;
}
