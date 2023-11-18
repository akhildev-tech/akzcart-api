import { Provider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Pool } from 'pg';
import { from, lastValueFrom, timer } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Logger } from 'src/logger/logger.service';
import * as K from 'src/shared/constants/database.constants';
import configuration from '../configuration/configuration';

export const databaseConnectionFactory: Provider = generateDatabasePool({
  provider: K.DATABASE_CONNECTION_PROVIDER,
});

function generateDatabasePool({ provider }): Provider {
  return {
    provide: provider,
    useFactory: async (config: ConfigType<typeof configuration>) => {
      const logger = new Logger(K.DATABASE_CONNECTION);

      const pool = new Pool({
        host: config.db.host,
        database: config.db.database,
        port: parseInt(config.db.port as string, 10),
        user: config.db.user,
        password: config.db.password,
      });

      return lastValueFrom(
        from(pool.connect()).pipe(
          retry({
            count: K.DATABASE_MAX_ATTEMPT,
            delay: (error: Error, retryCount) => {
              const message = `Unable to connect to database. ${error.message}. Retrying ${retryCount}...`;
              logger.log(message);
              return timer(K.DATABASE_ATTEMPT_DELAY);
            },
            resetOnSuccess: true,
          }),
          catchError((err) => {
            logger.error(err);
            throw err;
          }),
          tap(() => {
            logger.log(`Connected to database successfully`);
          }),
        ),
      );
    },
    inject: [configuration.KEY],
  };
}
