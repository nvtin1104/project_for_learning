export const validateBeforeCreate = async (schema, data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}