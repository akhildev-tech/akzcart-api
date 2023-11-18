import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [LoggerModule, SupabaseModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
