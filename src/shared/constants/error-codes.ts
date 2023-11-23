const DEFAULT_ERROR_CODE = {
  DEFAULT: {
    statusCode: 1000,
    message: 'Internal error',
  },
  INPUT: {
    statusCode: 1001,
    message: 'Invalid input format',
  },
};

const AUTH_ERROR_CODE = {
  AUTH_ERROR: {
    statusCode: 1100,
    message: 'Authentication error',
  },
  INVALID_ACCESS_TOKEN: {
    statusCode: 1101,
    message: 'Invalid access token',
  },
  INVALID_REFRESH_TOKEN: {
    statusCode: 1102,
    message: 'Invalid refresh token',
  },
  NO_AUTH_TOKEN: {
    statusCode: 1103,
    message: 'No auth token',
  },
  MAX_LOGIN_LIMIT: {
    statusCode: 1104,
    message: 'Maximum login limit reached',
  },
};

export const ERROR_CODE = {
  ...DEFAULT_ERROR_CODE,
  ...AUTH_ERROR_CODE,
};
