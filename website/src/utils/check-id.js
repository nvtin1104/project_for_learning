export const validateObjectId = (value) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/; // Regular expression for a valid ObjectID
  return objectIdRegex.test(value);
};
