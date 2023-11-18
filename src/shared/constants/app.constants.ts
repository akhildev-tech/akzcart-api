export const NODE_ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const DEFAULT_PORT = '3000';

export const DEFAULT_ADDRESS = '0.0.0.0';

export const MAX_JSON_REQUEST_SIZE = 10485760;

export const CORS_METHODS = 'HEAD,OPTIONS,GET,POST,PATCH,DELETE';

export const BOOLEAN = { TRUE: 'true', FALSE: 'false' };

export type LOGGER_LEVEL_TYPE = 'error' | 'log' | 'warn';

export const LOGGER_LEVEL: {
  ERROR: LOGGER_LEVEL_TYPE;
  LOG: LOGGER_LEVEL_TYPE;
  WARN: LOGGER_LEVEL_TYPE;
} = {
  ERROR: 'error',
  LOG: 'log',
  WARN: 'warn',
};
