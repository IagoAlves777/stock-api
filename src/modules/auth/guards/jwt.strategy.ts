import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from '@config/jwt';

export interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'USER';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: User): Promise<User> {
    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
    };
  }
}
