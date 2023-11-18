import { TypedBody } from '@nestia/core';
import { Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginInterface, SignupInterface } from './interfaces/auth.interface';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  signup(@TypedBody() body: SignupInterface): Observable<any> {
    return this.auth.signup(body);
  }

  @Post('login')
  login(@TypedBody() body: LoginInterface): Observable<any> {
    return this.auth.login(body);
  }
}
