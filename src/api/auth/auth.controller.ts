import { TypedBody } from '@nestia/core';
import { Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginInterface, SignupInterface } from './interfaces/auth.interface';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  @Public()
  signup(@TypedBody() body: SignupInterface): Observable<boolean> {
    return this.auth.signup(body);
  }

  @Post('login')
  @Public()
  login(@TypedBody() body: LoginInterface) {
    return this.auth.login(body);
  }
}
