import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GetAiMessageDto } from './dto/get-ai-response.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}
  @Post()
  getResponse(@Body() data: GetAiMessageDto) {
    return this.geminiService.generateText(data);
  }
}
