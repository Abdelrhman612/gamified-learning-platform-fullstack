import { JwtService } from '@nestjs/jwt';

export const generateToken = (
  jwtService: JwtService,
  payload: object,
  expiresIn = process.env.JWT_EXPIRES,
) => {
  return jwtService.sign(payload, {
    secret: process.env.JWT_SECRET,
    expiresIn,
  });
};
