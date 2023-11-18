import { Inject, Injectable, Logger, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Pool } from 'pg';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DatabaseException } from 'src/exceptions/database.exception';
import { DATABASE_CONNECTION_PROVIDER } from 'src/shared/constants/database.constants';
import { convertKeysToCamelCase } from 'src/utils/utils';

@Injectable()
export class DatabaseService<T> {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(@Inject(DATABASE_CONNECTION_PROVIDER) private pool: Pool) {}

  private runQuery(
    query: string,
    params: any[],
    type: Type<T>,
  ): Observable<T[]> {
    return from(this.pool.query(query, params)).pipe(
      tap((response) => {
        this.logger.debug({ query, rows: response.rowCount });
      }),
      map((response) =>
        response.rows
          .map((row) => convertKeysToCamelCase(row))
          .map((row) => plainToClass(type, row)),
      ),
      catchError((err) => {
        this.logger.error(err);
        throw new DatabaseException(err, err.message);
      }),
    );
  }

  query(query: string, params: Array<any>, type: Type<T>): Observable<T[]> {
    return this.runQuery(query, params, type);
  }
}
