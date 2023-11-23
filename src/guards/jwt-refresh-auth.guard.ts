import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_STRATEGY } from '../shared/constants';
import * as K from '../shared/constants';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(JWT_STRATEGY.REFRESH) {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info?.toString() === 'Error: No auth token') {
      throw new UnauthorizedException(K.ERROR_CODE.NO_AUTH_TOKEN);
    }
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(K.ERROR_CODE.INVALID_REFRESH_TOKEN);
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
