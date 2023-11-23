import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Logger } from 'src/logger/logger.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly logger: Logger,
    private readonly redis: RedisService,
  ) {
    this.logger.setContext(ProfileService.name);
  }

  getProfile(): Observable<any> {
    return of({ id: 1 });
  }
}
