import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from '@google/generative-ai';
import { GeminiService } from '../gemini.service';
import { Logger } from '@nestjs/common';

jest.mock('@google/generative-ai');

const MockGoogleAI = GoogleGenerativeAI as jest.MockedClass<
  typeof GoogleGenerativeAI
>;

describe('GeminiService', () => {
  let service: GeminiService;
  let loggerErrorSpy: jest.SpyInstance;

  const mockSendMessage = jest.fn();
  const mockChatSession: Partial<ChatSession> = {
    sendMessage: mockSendMessage,
  };

  const mockStartChat = jest.fn().mockReturnValue(mockChatSession);

  const mockModel: Partial<GenerativeModel> = {
    startChat: mockStartChat,
  };

  const mockGetGenerativeModel = jest.fn().mockReturnValue(mockModel);

  const mockGoogleAI = {
    getGenerativeModel: mockGetGenerativeModel,
  } as unknown as GoogleGenerativeAI;

  beforeEach(async () => {
    jest.clearAllMocks();

    MockGoogleAI.mockImplementation(
      () => mockGoogleAI as unknown as GoogleGenerativeAI,
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('fake-api-key'),
          },
        },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);

    // spy على اللوجر
    loggerErrorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    loggerErrorSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize GoogleGenerativeAI with api key', () => {
    expect(MockGoogleAI).toHaveBeenCalledWith('fake-api-key');
    expect(mockGetGenerativeModel).toHaveBeenCalledWith({
      model: 'gemini-1.5-flash',
    });
  });

  it('should create a new chat session if none exists', async () => {
    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => 'Hello world' },
    });

    const result = await service.generateText({ prompt: 'hi' });

    expect(mockStartChat).toHaveBeenCalled();
    expect(mockSendMessage).toHaveBeenCalledWith('hi');
    expect(result.result).toBe('Hello world');
    expect(result.sessionId).toBeDefined();
  });

  it('should reuse existing chat session if sessionId provided', async () => {
    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => 'First answer' },
    });

    const firstCall = await service.generateText({ prompt: 'hi' });
    const sessionId = firstCall.sessionId;

    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => 'Second answer' },
    });

    const secondCall = await service.generateText({
      prompt: 'how are you?',
      sessionId,
    });

    expect(mockStartChat).toHaveBeenCalledTimes(1);
    expect(mockSendMessage).toHaveBeenCalledWith('how are you?');
    expect(secondCall.result).toBe('Second answer');
    expect(secondCall.sessionId).toBe(sessionId);
  });

  it('should log and throw error if sendMessage fails', async () => {
    const error = new Error('API error');
    mockSendMessage.mockRejectedValueOnce(error);

    await expect(service.generateText({ prompt: 'fail' })).rejects.toThrow(
      'API error',
    );
    expect(loggerErrorSpy).toHaveBeenCalledWith('Error generating text', error);
  });
});
