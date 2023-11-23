import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  loggerLevel: process.env.LOGGER_LEVEL,
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiry: process.env.JWT_REFRESH_EXPIRY,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  sessionLimit: process.env.SESSION_LIMIT,
}));
