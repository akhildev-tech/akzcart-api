import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { JwtTokenModule } from 'src/jwt-token/jwt-token.module';
import { LoggerModule } from 'src/logger/logger.module';
import { RedisModule } from 'src/redis/redis.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';

@Module({
  imports: [
    DatabaseModule,
    JwtTokenModule,
    LoggerModule,
    RedisModule,
    SupabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper],
})
export class AuthModule {}
