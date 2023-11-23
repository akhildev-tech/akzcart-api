import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

  onModuleDestroy(): void {
    this.redisClient.disconnect();
  }

  get<T>(key: any): Observable<any> {
    return from(this.redisClient.get(JSON.stringify(key))).pipe(
      map((response: string) => {
        return JSON.parse(response) as T;
      }),
    );
  }

  set(key: any, value: any): Observable<void> {
    return from(
      this.redisClient.set(JSON.stringify(key), JSON.stringify(value)),
    ).pipe(
      map(() => {
        return;
      }),
    );
  }

  delete(key: any): Observable<void> {
    return from(this.redisClient.del(JSON.stringify(key))).pipe(
      map(() => {
        return;
      }),
    );
  }
}
