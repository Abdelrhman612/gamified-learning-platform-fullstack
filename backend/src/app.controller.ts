import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '✅ Backend is running on Railway!';
  }

  @Get('health')
  healthCheck(): string {
    return '🚀 Health check passed! Server is up and running.';
  }
}
