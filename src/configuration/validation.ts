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
});
