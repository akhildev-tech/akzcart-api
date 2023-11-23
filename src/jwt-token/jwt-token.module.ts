import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import configuration from 'src/configuration/configuration';
import { LoggerModule } from 'src/logger/logger.module';
import { RedisModule } from '../redis/redis.module';
import { JWT_ALGORITHM } from '../shared/constants/jwt.constants';
import { JwtTokenService } from './jwt-token.service';
import { JwtRefreshTokenStrategy } from './strategies/jwt-token-refresh.strategy';
import { JwtTokenStrategy } from './strategies/jwt-token.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigType<typeof configuration>) => ({
        secret: config.jwt.secret,
        signOptions: { expiresIn: config.jwt.expiry, algorithm: JWT_ALGORITHM },
      }),
      inject: [configuration.KEY],
    }),
    PassportModule,
    LoggerModule,
    RedisModule,
  ],
  providers: [JwtTokenService, JwtTokenStrategy, JwtRefreshTokenStrategy],
  exports: [JwtTokenService, JwtModule],
})
export class JwtTokenModule {}
