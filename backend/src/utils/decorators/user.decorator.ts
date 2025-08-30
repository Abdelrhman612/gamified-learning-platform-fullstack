import { ExecutionContext, createParamDecorator } from '@nestjs/common';

type Payload = {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
};

export const User = createParamDecorator(
  (data: keyof Payload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: Payload }>();
    const user: Payload = request.user;
    return data ? user?.[data] : user;
  },
);
