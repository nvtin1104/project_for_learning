const Joi = require('joi')
const { GET_DB } = require('~/config/mongodb')
const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  password: Joi.string().max(60).required(),
  createdAt: Joi.date().default(Date.now()),
  updatedAt: Joi.date().default(null),
  verifiedDate: Joi.date().default(null),
  token: Joi.string(),
  role: Joi.string().valid('user', 'admin').default('user')
})
const create = async (data) => {
  try {
    const validData = await userSchema.validateAsync(data, { abortEarly: false })
    const db = await GET_DB()
    const result = await db.collection('users').insertOne(validData)
    const user = await db.collection('users').findOne({ _id: result.insertedId })
    delete user.password
    return user
  } catch (error) {
    throw new Error(error)
  }
}
const getAll = async () => {
  try {
    const db = await GET_DB()
    const users = await db.collection('users').find({}).toArray()
    return users
  } catch (error) {
    throw new Error(error)
  }
}
const getUserBy = async (data, option) => {
  try {
    const db = await GET_DB()
    const user = await db.collection('users').findOne({ [option]: data })
    return user
  }
  catch (error) {
    throw new Error(error)
  }
}
export const UserModel = {
  create,
  getAll,
  getUserBy
}