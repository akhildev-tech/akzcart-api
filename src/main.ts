import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Logger } from './logger/logger.service';
import * as K from './shared/constants/app.constants';

async function bootstrap() {
  const logger = new Logger('main');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: K.MAX_JSON_REQUEST_SIZE }),
  );

  // Enabling logger
  app.useLogger(logger);

  // Configuration
  const configuration = app.get<ConfigService>(ConfigService);
  const port = configuration.get<string>('configuration.port');
  const env = configuration.get<string>('configuration.environment');

  // Enabling api version
  app.enableVersioning({ type: VersioningType.URI });

  // Enabling CORS
  app.enableCors({
    origin: true,
    methods: K.CORS_METHODS,
    credentials: true,
  });

  // Transforming response
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port as string, K.DEFAULT_ADDRESS);
  logger.log(`Listening on port ${port}, running in ${env} environment`);
}
bootstrap();
