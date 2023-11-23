import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as K from '../../shared/constants';
import {
  RefreshTokenPayload,
  TokenPayload,
} from '../interfaces/token-payload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  K.JWT_STRATEGY.REFRESH,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: any, payload: TokenPayload): RefreshTokenPayload {
    // Extracts the refresh token from the request header.
    const refreshToken = req?.headers?.authorization
      ?.replace('Bearer', '')
      .trim();
    if (!refreshToken) {
      throw new UnauthorizedException(K.ERROR_CODE.INVALID_REFRESH_TOKEN);
    }

    return { ...payload, refreshToken };
  }
}
