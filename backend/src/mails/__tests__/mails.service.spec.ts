import { Test, TestingModule } from '@nestjs/testing';

import { MailerService } from '@nestjs-modules/mailer';
import { MailsService } from '../mails.service';

describe('MailsService', () => {
  let service: MailsService;
  let mailerService: MailerService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailsService,
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<MailsService>(MailsService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendWelcomeEmail', () => {
    it('should call mailerService.sendMail with correct parameters', async () => {
      const to = 'test@test.com';
      const name = 'Test User';

      await service.sendWelcomeEmail(to, name);
      const sendMailSpy = jest
        .spyOn(mailerService, 'sendMail')
        .mockResolvedValueOnce(undefined);
      expect(sendMailSpy).toHaveBeenCalledWith({
        to,
        subject: 'Welcome to Gamified Platform 🎉',
        template: 'welcome',
        context: { name },
      });
    });
  });
});
