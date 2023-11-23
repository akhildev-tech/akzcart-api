import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable, forkJoin } from 'rxjs';
import configuration from 'src/configuration/configuration';
import { Logger } from 'src/logger/logger.service';
import { JWT_ALGORITHM } from 'src/shared/constants/jwt.constants';
import { TokenInterface } from 'src/shared/interfaces/auth.interface';

@Injectable()
export class JwtTokenService {
  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(JwtTokenService.name);
  }

  /**
   * Method to generate an access token and a refresh token.
   * @param { number} userId Id of the user.
   * @returns {Promise<any>} Access token and refresh token.
   */
  generateToken(userId: number, deviceId: string): Observable<TokenInterface> {
    return forkJoin({
      accessToken: this.jwtService.signAsync({ userId, deviceId }),
      refreshToken: this.jwtService.signAsync(
        { userId, deviceId },
        {
          secret: this.config.jwt.refresh.secret,
          expiresIn: this.config.jwt.refresh.expiry,
          algorithm: JWT_ALGORITHM,
        },
      ),
    });
  }
}
