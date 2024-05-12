import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
const lessonSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  auth: Joi.string().min(3).max(100).required(),
  authId: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500).required(),
  category: Joi.object({
    topicId: Joi.string().min(3).max(100).required(),
    subject: Joi.string().min(3).max(100).required()
  }).required(),
  type: Joi.string().valid('test', 'lesson', 'memo').required(),
  limit: Joi.number().min(1).max(1000).required(),
  questions: Joi.array().items(Joi.object({
    question: Joi.string().min(3).max(500).required(),
    options: Joi.array().items(Joi.object({
      option: Joi.string().min(1).max(500).required(),
      isCorrect: Joi.boolean().required()
    })).min(2).required()
  })).min(1).max(60).required(),
  expirationDate: Joi.date().default(null),
  createdAt: Joi.date().default(Date.now()),
  updatedAt: Joi.date().default(null),
  status: Joi.string().valid('active', 'inactive').default('active')
})
const lessonSchemaUpdate = Joi.object({
  title: Joi.string().min(3).max(100),
  auth: Joi.string().min(3).max(100),
  authId: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(500),
  type: Joi.string().valid('test', 'lesson', 'memo'),
  category: Joi.object({
    topicId: Joi.string().min(3).max(100).required(),
    subject: Joi.string().min(3).max(100).required()
  }),
  limit: Joi.number().min(1).max(1000),
  questions: Joi.array().items(Joi.object({
    question: Joi.string().min(3).max(500),
    options: Joi.array().items(Joi.object({
      option: Joi.string().min(1).max(500),
      isCorrect: Joi.boolean()
    })).min(2)
  })).min(1),
  expirationDate: Joi.date(),
  updatedAt: Joi.date().default(Date.now()),
  status: Joi.string().valid('active', 'inactive')
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
const update = async (id, data) => {
  try {
    const validData = await lessonSchemaUpdate.validateAsync(data, { abortEarly: true })
    if (validData.authId) validData.authId = new ObjectId(validData.authId)
    const db = await GET_DB()
    await db.collection('lessons').updateOne({ _id: new ObjectId(id) }, { $set: validData })
    const lesson = await db.collection('lessons').findOne({ _id: new ObjectId(id) })
    return lesson
  } catch (error) {
    throw new Error(error)
  }
}
const getAllActiveLessons = async ({limit, page}) => {
  try {
    const offset = limit * page
    const db = await GET_DB()
    const lessons = await db.collection('lessons').find({ status: 'active' }).limit(Number(limit)).skip(offset).toArray()
    return lessons
  } catch (error) {
    throw new Error(error)
  }
}
const getAllLessons = async ({limit, page}) => {
  try {
    const offset = limit * page
    const db = await GET_DB()
    const lessons = await db.collection('lessons').find().limit(Number(limit)).skip(offset).toArray()
    return lessons
  } catch (error) {
    throw new Error(error)
  }
}
const getLessonById = async (id) => {
  try {
    const db = await GET_DB()
    const lesson = await db.collection('lessons').findOne({ _id: new ObjectId(id) })
    return lesson
  } catch (error) {
    throw new Error(error)
  }
}
const getLessonsByUserId = async (id) => {
  try {
    const db = await GET_DB()
    const lessons = await db.collection('lessons').find({ authId: new ObjectId(id) }).toArray()
    return lessons
  } catch (error) {
    throw new Error(error)
  }
}
const deleteLessonById = async (id) => {
  try {
    const db = await GET_DB()
    const result = await db.collection('lessons').deleteOne({ _id: new ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const LessonsModel = {
  create,
  getAllActiveLessons,
  getLessonById,
  deleteLessonById,
  getAllLessons,
  update,
  getLessonsByUserId
}