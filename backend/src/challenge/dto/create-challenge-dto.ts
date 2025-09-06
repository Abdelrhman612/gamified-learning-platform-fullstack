import { IsNumber, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsNumber()
  points: number;

  @IsString()
  startAt: string;

  @IsString()
  endAt: string;
}
