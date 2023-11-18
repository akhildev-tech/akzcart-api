import { Module } from '@nestjs/common';
import { Logger } from './logger.service';

@Module({ providers: [Logger] })
export class LoggerModule {}
