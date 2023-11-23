import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Observable, map } from 'rxjs';
import { Logger } from 'src/logger/logger.service';
import { RedisService } from 'src/redis/redis.service';
import * as K from '../../shared/constants';
import { JWT_STRATEGY } from '../../shared/constants';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_STRATEGY.DEFAULT,
) {
  constructor(
    private readonly logger: Logger,
    private readonly redis: RedisService,
  ) {
    logger.setContext(JwtTokenStrategy.name);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: any, payload: TokenPayload): Observable<TokenPayload> {
    const accessTokenFromHeader = req?.headers?.authorization
      ?.replace('Bearer', '')
      .trim();

    if (!accessTokenFromHeader) {
      throw new UnauthorizedException(K.ERROR_CODE.INVALID_ACCESS_TOKEN);
    }

    const { userId, deviceId } = payload;
    if (!userId || !deviceId) {
      throw new UnauthorizedException(K.ERROR_CODE.INVALID_ACCESS_TOKEN);
    }

    this.logger.log('Getting data from the Redis.');

    return this.redis.get(userId).pipe(
      map((data) => {
        if (!data) {
          throw new UnauthorizedException(K.ERROR_CODE.INVALID_ACCESS_TOKEN);
        }

        const index = data.accessToken.findIndex((token) => !!token[deviceId]);
        if (index < 0) {
          throw new UnauthorizedException(K.ERROR_CODE.INVALID_ACCESS_TOKEN);
        } else {
          const accessToken = data.accessToken[index][deviceId];
          if (accessToken !== accessTokenFromHeader) {
            throw new UnauthorizedException(K.ERROR_CODE.INVALID_ACCESS_TOKEN);
          }
        }

        return payload;
      }),
    );
  }
}
