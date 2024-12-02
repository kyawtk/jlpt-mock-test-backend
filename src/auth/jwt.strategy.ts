import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy,  } from 'passport-jwt';
import { LocalStrategy } from './local.stategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from the Authorization header
      ignoreExpiration: false, // Ensure token expiration is respected
      // Use the same secret as in JwtModule
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    // This function determines what data will be attached to `req.user`
    return { ...payload };
  }
}
