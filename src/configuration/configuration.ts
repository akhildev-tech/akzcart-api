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
}));
