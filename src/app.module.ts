import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import configuration from './configuration/configuration';
import validationSchema from './configuration/validation';
import { DatabaseModule } from './database/database.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    ApiModule,
    DatabaseModule,
    SupabaseModule,
  ],
})
export class AppModule {}
