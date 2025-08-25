import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetAiMessageDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsString()
  @IsOptional()
  sessionId?: string;
}
