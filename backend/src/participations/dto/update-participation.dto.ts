import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateParticipationDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  awardedPoints?: number;

  @IsOptional()
  @IsString()
  submission?: string;

  @IsOptional()
  @IsString()
  submissionUrl?: string;
}
