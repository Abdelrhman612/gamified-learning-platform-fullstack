import { Test, TestingModule } from '@nestjs/testing';
import { GeminiController } from '../gemini.controller';
import { GeminiService } from '../gemini.service';
import { GetAiMessageDto } from '../dto/get-ai-response.dto';
import { JwtService } from '@nestjs/jwt';

describe('GeminiController', () => {
  let controller: GeminiController;

  const mockGeminiService = {
    generateText: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeminiController],
      providers: [
        {
          provide: GeminiService,
          useValue: mockGeminiService,
        },
        {
          provide: 'AuthGuards',
          useValue: jest.fn(),
        },
        {
          provide: JwtService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<GeminiController>(GeminiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getResponse', () => {
    it('should call geminiService.generateText with dto', async () => {
      const dto: GetAiMessageDto = { prompt: 'hello' };
      const expectedResult = { result: 'hi', sessionId: '123' };

      mockGeminiService.generateText.mockResolvedValueOnce(expectedResult);

      const result = await controller.getResponse(dto);

      expect(mockGeminiService.generateText).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});
