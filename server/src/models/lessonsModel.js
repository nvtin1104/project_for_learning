import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
const lessonSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  auth: Joi.string().min(3).max(100).required(),
  authId: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500).required(),
  type: Joi.string().valid('test', 'lesson', 'memo').required(),
  limit: Joi.number().min(1).max(1000).required(),
  questions: Joi.array().items(Joi.object({
    question: Joi.string().min(3).max(500).required(),
    options: Joi.array().items(Joi.object({
      option: Joi.string().min(1).max(500).required(),
      isCorrect: Joi.boolean().required()
    })).min(2).required()
  })).min(1).required(),
  createdAt: Joi.date().default(Date.now()),
  updatedAt: Joi.date().default(null),
  status: Joi.string().valid('active', 'inactive').default('active')
})
const create = async (data) => {
  try {
    const validData = await lessonSchema.validateAsync(data, { abortEarly: true })
    validData.authId = new ObjectId(validData.authId)
    const db = await GET_DB()
    const result = await db.collection('lessons').insertOne(validData)
    const lesson = await db.collection('lessons').findOne({ _id: result.insertedId })
    return lesson
  } catch (error) {
    throw new Error(error)
  }
}
export const LessonsModel = {
  create
}