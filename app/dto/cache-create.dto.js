export const CacheCreateSchemaFactory = () => {
  const schema = {
    key: Joi.string().required(),
    value: Joi.string(),
  }
  return Joi.object().keys(schema)
};
export const CacheCreateSchema = CacheCreateSchemaFactory({});