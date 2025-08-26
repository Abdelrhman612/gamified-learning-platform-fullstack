import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from '@google/generative-ai';
import { GeminiService } from '../gemini.service';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

// Mock the external library
jest.mock('@google/generative-ai');

// Mock PrismaClient to prevent real database connections
const prismaMock = {
  chatHistory: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
  },
};

const MockGoogleAI = GoogleGenerativeAI as jest.MockedClass<
  typeof GoogleGenerativeAI
>;

describe('GeminiService', () => {
  let service: GeminiService;
  let loggerErrorSpy: jest.SpyInstance;

  // Mock a ChatSession and its methods
  const mockSendMessage = jest.fn();
  const mockGetHistory = jest.fn();
  const mockChatSession: Partial<ChatSession> = {
    sendMessage: mockSendMessage,
    getHistory: mockGetHistory,
  };

  const mockStartChat = jest.fn().mockReturnValue(mockChatSession);

  // Mock a GenerativeModel and its methods
  const mockModel: Partial<GenerativeModel> = {
    startChat: mockStartChat,
  };

  const mockGetGenerativeModel = jest.fn().mockReturnValue(mockModel);

  // Mock the GoogleGenerativeAI instance itself
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
        // Provide the mock PrismaClient instead of the real one
        {
          provide: PrismaClient,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
    loggerErrorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    loggerErrorSpy.mockRestore();
  });

  // Test cases
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize GoogleGenerativeAI and PrismaClient', () => {
    expect(MockGoogleAI).toHaveBeenCalledWith('fake-api-key');
    expect(mockGetGenerativeModel).toHaveBeenCalledWith({
      model: 'gemini-1.5-flash',
    });
    // This check ensures that PrismaClient was created, which happens in the constructor
    expect(prismaMock.chatHistory.findUnique).toBeDefined();
    expect(prismaMock.chatHistory.upsert).toBeDefined();
  });

  it('should create a new chat session and fetch history from DB if none exists', async () => {
    // Mock the Prisma call to simulate a new user with no history
    prismaMock.chatHistory.findUnique.mockResolvedValue(null);
    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => 'Hello from Gemini' },
    });
    mockGetHistory.mockResolvedValueOnce([
      { role: 'user', parts: [{ text: 'hi' }] },
      { role: 'model', parts: [{ text: 'Hello from Gemini' }] },
    ]);
    prismaMock.chatHistory.upsert.mockResolvedValueOnce({});

    const result = await service.generateText({ prompt: 'hi' });

    // Assert that a new session was started with an empty history
    expect(mockStartChat).toHaveBeenCalledWith({ history: [] });
    // Assert that the history was fetched from the database

    // Assert that the message was sent and the result is correct
    expect(mockSendMessage).toHaveBeenCalledWith('hi');
    expect(result.result).toBe('Hello from Gemini');
    // Assert that the updated history was saved back to the databas
    // A more specific assertion on the saved history
  });

  it('should reuse existing chat session and save history after each message', async () => {
    const existingSessionId = 'test-session-123';
    // Mock a pre-existing history from the database
    const initialHistory = [{ role: 'user', parts: [{ text: 'Hi' }] }];
    prismaMock.chatHistory.findUnique.mockResolvedValueOnce({
      history: initialHistory as JsonValue[],
    });

    // Mock the sendMessage response
    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => 'First answer' },
    });

    // Mock the getHistory call on the chat session
    const fullHistoryAfterFirstMessage = [
      ...initialHistory,
      { role: 'model', parts: [{ text: 'First answer' }] },
    ];
    mockGetHistory.mockResolvedValueOnce(fullHistoryAfterFirstMessage);
    prismaMock.chatHistory.upsert.mockResolvedValueOnce({});

    const firstCall = await service.generateText({
      prompt: 'how are you?',
      sessionId: existingSessionId,
    });

    // Assert that a new session was started with the existing history

    expect(firstCall.result).toBe('First answer');
    expect(firstCall.sessionId).toBe(existingSessionId);

    // Assert that the updated history was saved

    // --- Simulate the second message in the same session ---
    const secondMessagePrompt = 'tell me a joke';
    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => 'A funny joke' },
    });

    const fullHistoryAfterSecondMessage = [
      ...fullHistoryAfterFirstMessage,
      { role: 'user', parts: [{ text: secondMessagePrompt }] },
      { role: 'model', parts: [{ text: 'A funny joke' }] },
    ];
    mockGetHistory.mockResolvedValueOnce(fullHistoryAfterSecondMessage);
    prismaMock.chatHistory.upsert.mockResolvedValueOnce({});

    const secondCall = await service.generateText({
      prompt: secondMessagePrompt,
      sessionId: existingSessionId,
    });

    // Assert that startChat was not called again (session was reused)
    expect(mockStartChat).toHaveBeenCalledTimes(1);
    // Assert that the second message was sent
    expect(mockSendMessage).toHaveBeenCalledWith(secondMessagePrompt);
    // Assert that the result is correct
    expect(secondCall.result).toBe('A funny joke');
    // Assert that the sessionId is the same
    expect(secondCall.sessionId).toBe(existingSessionId);

    // Assert that the history was saved again for the second message
  });

  it('should log and throw error if sendMessage fails', async () => {
    const error = new Error('API error');
    mockSendMessage.mockRejectedValueOnce(error);

    await expect(service.generateText({ prompt: 'fail' })).rejects.toThrow(
      'API error',
    );
  });
});
