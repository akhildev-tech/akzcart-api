import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import * as fastJson from 'fast-json-stringify';
import { Redis } from 'ioredis';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private stringify: any;

  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {
    this.stringify = fastJson({});
  }

  onModuleDestroy(): void {
    this.redisClient.disconnect();
  }

  get<T>(key: any): Observable<T> {
    return from(this.redisClient.get(key.toString())).pipe(
      map((response: string) => {
        return JSON.parse(response) as T;
      }),
    );
  }

  set(key: any, value: any): Observable<any> {
    return from(this.redisClient.set(key.toString(), this.stringify(value)));
  }

  delete(key: any): Observable<any> {
    return from(this.redisClient.del(key.toString()));
  }
}
