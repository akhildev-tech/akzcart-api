import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable, switchMap } from 'rxjs';
import configuration from 'src/configuration/configuration';
import { RedisService } from 'src/redis/redis.service';
import { AuthRedisInterface } from './interfaces/auth.interface';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly redis: RedisService,
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {}

  setAuthToken(
    userId: number,
    deviceId: string,
    accessToken: string,
    refreshToken: string,
  ): Observable<void> {
    return this.redis.get<AuthRedisInterface>(userId).pipe(
      switchMap((response: AuthRedisInterface) => {
        const token = response?.accessToken;
        const tokenCount = response?.accessToken?.length;
        let data;

        if (token && tokenCount) {
          const index = token.findIndex((token) => !!token[deviceId]);

          if (index < 0) {
            if (tokenCount >= Number(this.config.sessionLimit as string)) {
              response.accessToken.shift();
              response.refreshToken.shift();
            }
            response.accessToken.push({ [deviceId]: accessToken });
            response.refreshToken.push({ [deviceId]: refreshToken });
          } else {
            response.accessToken[index][deviceId] = accessToken;
            response.refreshToken[index][deviceId] = refreshToken;
          }

          data = response;
        } else {
          data = {
            accessToken: [{ [deviceId]: accessToken }],
            refreshToken: [{ [deviceId]: refreshToken }],
          };
        }

        return this.redis.set(userId, data);
      }),
    );
  }
}
