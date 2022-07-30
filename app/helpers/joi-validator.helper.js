export const joiValidator = (data, schema) => {
  const { error } = schema.validate(value, { abortEarly: false });
  if (error) {
    throw new Error('Bad Request', { details: error.details, statusCode: 400, error: 'Bad Request' });
  }
}