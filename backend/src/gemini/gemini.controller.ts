import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GetAiMessageDto } from './dto/get-ai-response.dto';
import { AuthGuards } from 'src/Auth/auth.guard';

@Controller('gemini')
@UseGuards(AuthGuards)
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}
  @Post()
  getResponse(@Body() data: GetAiMessageDto) {
    return this.geminiService.generateText(data);
  }
}
