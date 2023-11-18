import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [LoggerModule],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
