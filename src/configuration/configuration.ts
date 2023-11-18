import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  loggerLevel: process.env.LOGGER_LEVEL,
}));
