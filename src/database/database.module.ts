import { Module } from '@nestjs/common';
import { databaseConnectionFactory } from './database.provider';
import { DatabaseService } from './database.service';

@Module({
  providers: [databaseConnectionFactory, DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
