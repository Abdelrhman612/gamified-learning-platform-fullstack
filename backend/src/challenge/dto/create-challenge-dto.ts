import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsNumber()
  points: number;

  @IsDate()
  startAt: Date;

  @IsDate()
  endAt: Date;
}
