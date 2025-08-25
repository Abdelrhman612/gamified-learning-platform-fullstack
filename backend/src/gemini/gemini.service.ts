import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetAiMessageDto } from './dto/get-ai-response.dto';
import { v4 } from 'uuid';
const GEMINI_MODEL = 'gemini-1.5-flash';
@Injectable()
export class GeminiService {
  private readonly googleAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;
  private chatsessions: { [sessionId: string]: ChatSession } = {};
  private readonly logger = new Logger(GeminiService.name);
  constructor(configService: ConfigService) {
    const geminiApiKey = configService.get<string>('GEMINI_API_KEY');
    this.googleAI = new GoogleGenerativeAI(geminiApiKey as string);
    this.model = this.googleAI.getGenerativeModel({ model: GEMINI_MODEL });
  }
  private getChatSession(sessionId?: string) {
    const sessionIdToUse = sessionId ?? v4();
    let result = this.chatsessions[sessionIdToUse];
    if (!result) {
      result = this.model.startChat();
      this.chatsessions[sessionIdToUse] = result;
    }
    return { sessionId: sessionIdToUse, chat: result };
  }
  async generateText(data: GetAiMessageDto) {
    try {
      const { sessionId, chat } = this.getChatSession(data.sessionId);
      const result = await chat.sendMessage(data.prompt);

      return { result: result.response.text(), sessionId };
    } catch (error) {
      this.logger.error('Error generating text', error);
      throw error;
    }
  }
}
