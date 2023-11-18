import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ProfileModule } from './profile/profile.module';

@Module({ imports: [HealthModule, AuthModule, ProfileModule] })
export class ApiModule {}
