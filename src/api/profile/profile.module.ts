import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { RedisModule } from 'src/redis/redis.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [LoggerModule, RedisModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
