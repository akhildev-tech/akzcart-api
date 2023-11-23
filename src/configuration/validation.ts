import * as Joi from 'joi';
import * as K from 'src/shared/constants';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(K.NODE_ENVIRONMENT))
    .default(K.NODE_ENVIRONMENT.DEVELOPMENT),
  PORT: Joi.string().default(K.DEFAULT_PORT),
  DEBUG_MODE: Joi.string()
    .valid(...Object.values(K.BOOLEAN_STRING))
    .default(K.BOOLEAN_STRING.TRUE),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.string().default(K.DATABASE_DEFAULT_PORT),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  SUPABASE_URL: Joi.string().required(),
  SUPABASE_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRY: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
});
