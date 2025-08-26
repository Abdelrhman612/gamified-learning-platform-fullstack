/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetAiMessageDto } from './dto/get-ai-response.dto';
import { v4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

const GEMINI_MODEL = 'gemini-1.5-flash';

@Injectable()
export class GeminiService {
  private readonly googleAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;
  private chatsessions: { [sessionId: string]: ChatSession } = {};
  private readonly logger = new Logger(GeminiService.name);
  private readonly prisma: PrismaClient;

  constructor(configService: ConfigService) {
    const geminiApiKey = configService.get<string>('GEMINI_API_KEY');
    this.googleAI = new GoogleGenerativeAI(geminiApiKey as string);
    this.model = this.googleAI.getGenerativeModel({ model: GEMINI_MODEL });
    this.prisma = new PrismaClient();
  }

  private async saveChatHistory(sessionId: string, history: JsonValue[]) {
    await this.prisma.chatHistory.upsert({
      where: { sessionId },
      update: { history: history },
      create: { sessionId: sessionId, history: history },
    });
  }

  private async getChatHistory(
    sessionId: string,
  ): Promise<{ history: JsonValue[] } | null> {
    const result = await this.prisma.chatHistory.findUnique({
      where: { sessionId },
      select: { history: true },
    });

    return {
      history: (result?.history as JsonValue[]) || [],
    };
  }

  private async getChatSession(sessionId?: string) {
    const sessionIdToUse = sessionId ?? v4();
    let chat = this.chatsessions[sessionIdToUse];

    if (!chat) {
      const historyRecord = await this.getChatHistory(sessionIdToUse);

      chat = this.model.startChat({
        history: (historyRecord?.history as any[]) || [],
      });

      this.chatsessions[sessionIdToUse] = chat;
    }

    return { sessionId: sessionIdToUse, chat };
  }

  async generateText(data: GetAiMessageDto) {
    try {
      const { sessionId, chat } = await this.getChatSession(data.sessionId);

      const result = await chat.sendMessage(data.prompt);

      const fullHistory: JsonValue[] = await chat
        .getHistory()
        .then((content) => {
          return JSON.parse(JSON.stringify(content));
        });

      await this.saveChatHistory(sessionId, fullHistory);

      return { result: result.response.text(), sessionId };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error generating text', error.message, error.stack);
      } else {
        this.logger.error('Error generating text', error);
      }
      throw error;
    }
  }
}
