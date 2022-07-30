import Joi from 'joi';

export const CacheParamSchemaFactory = () => {
  const schema = {
    key: Joi.string().required(),
  }
  return Joi.object().keys(schema)
};
export const CacheParamSchema = CacheParamSchemaFactory({});
  