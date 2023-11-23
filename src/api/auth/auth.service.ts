import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable, map, of, switchMap } from 'rxjs';
import configuration from 'src/configuration/configuration';
import { DatabaseService } from 'src/database/database.service';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { Logger } from 'src/logger/logger.service';
import { RedisService } from 'src/redis/redis.service';
import { ERROR_CODE } from 'src/shared/constants';
import { TokenInterface } from 'src/shared/interfaces/auth.interface';
import { IdDbInterface } from 'src/shared/interfaces/id.db.interface';
import { SupabaseResponseUserDataInterface } from 'src/supabase/interfaces/supabase.interface';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AuthHelper } from './auth.helper';
import { loginDbQuery } from './db-queries/login.db-query';
import { signupDbQuery } from './db-queries/signup.db-query';
import { LoginInterface, SignupInterface } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly helper: AuthHelper,
    private readonly logger: Logger,
    private readonly supabase: SupabaseService,
    private readonly jwt: JwtTokenService,
    private readonly redis: RedisService,
    private readonly db: DatabaseService<any>,
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {
    this.logger.setContext(AuthService.name);
  }

  signup(body: SignupInterface): Observable<boolean> {
    return this.supabase.signup(body).pipe(
      switchMap(
        (response: SupabaseResponseUserDataInterface): Observable<boolean> => {
          this.db.query(
            signupDbQuery,
            [response.id, body.name, body.name.split(' ')[0], body.email],
            String,
          );
          return of(true);
        },
      ),
    );
  }

  login(body: LoginInterface) {
    const { email, deviceId } = body;

    return this.supabase.login(body).pipe(
      switchMap((response) => {
        if (!response) throw new UnauthorizedException(ERROR_CODE.AUTH_ERROR);

        return this.db.query(loginDbQuery, [email], IdDbInterface).pipe(
          switchMap(([response]: IdDbInterface[]) => {
            const userId = response.id;

            return this.jwt.generateToken(userId, deviceId).pipe(
              switchMap(({ accessToken, refreshToken }: TokenInterface) => {
                return this.helper
                  .setAuthToken(userId, deviceId, accessToken, refreshToken)
                  .pipe(map(() => ({ id: userId, accessToken, refreshToken })));
              }),
            );
          }),
        );
      }),
    );
  }
}
