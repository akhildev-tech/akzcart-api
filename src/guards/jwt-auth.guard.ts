import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as K from '../shared/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(K.JWT_STRATEGY.DEFAULT) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Checking whether the controller has a "public" decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      K.PUBLIC_METADATA,
      [context.getHandler(), context.getClass()],
    );

    /**
     * Skipping "JwtAuthGuard" access token validation
     * If the controller has  a "public" metadata set to true
     */
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info?.toString() === 'Error: No auth token') {
      throw new UnauthorizedException(K.ERROR_CODE.NO_AUTH_TOKEN);
    }
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(K.ERROR_CODE.INVALID_ACCESS_TOKEN);
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
