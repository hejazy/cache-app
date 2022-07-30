import Joi from 'joi';

export const CacheUpdateSchemaFactory = () => {
  const schema = {
    key: Joi.string().required(),
    value: Joi.string(),
  }
  return Joi.object().keys(schema)
};
export const CacheUpdateSchema = CacheUpdateSchemaFactory({});
