export const joiValidator = (data, schema) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const err = new Error('Bad Request');
    err.status = 400;
    err.details = error.details;
    throw err;
  }
}