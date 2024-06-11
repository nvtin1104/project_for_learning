import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const historyStudySchema = Joi.object({
  userId: Joi.string().min(3).max(100).required(),
  lessonId: Joi.string().min(3).max(100).required(),
  history: Joi.array().items(Joi.object({
    question: Joi.string().min(3).max(500).required(),
    answer: Joi.string().min(1).max(500),
    isCorrect: Joi.boolean()
  })).min(1).max(60).required(),
  status: Joi.string().valid('completed', 'incompleted').default('incompleted'),
  createdAt: Joi.date().default(Date.now()),
  updatedAt: Joi.date().default(null)
})
const historyTestSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  lessonId: Joi.string().min(3).max(100).required(),
  authId: Joi.string().min(3).max(100).required(),
  time: Joi.number().min(1).max(3600).required(),
  point: Joi.number().min(0).max(100).required(),
  rightAnswer: Joi.number().min(0).max(60).required(),
  wrongAnswer: Joi.number().min(0).max(60).required(),
  createdAt: Joi.date().default(Date.now()),
})
const historyUpdateSchema = Joi.object({
  userId: Joi.string().min(3).max(100),
  lessonId: Joi.string().min(3).max(100),
  history: Joi.array().items(Joi.object({
    question: Joi.string().min(3).max(500),
    answer: Joi.string().min(1).max(500),
    isCorrect: Joi.boolean()
  })).min(1).max(60),
  status: Joi.string().valid('completed', 'incompleted'),
  updatedAt: Joi.date().default(Date.now())
})
const create = async (data) => {
  try {
    const validData = await historyStudySchema.validateAsync(data, { abortEarly: true })
    validData.userId = new ObjectId(validData.userId)
    validData.lessonId = new ObjectId(validData.lessonId)
    const db = await GET_DB()
    const result = await db.collection('historyStudy').insertOne(validData)
    return  await db.collection('historyStudy').findOne({ _id: result.insertedId })
  } catch (error) {
    throw new Error(error)
  }
}
const createHistoryTest = async (data) => {
  try {
    const validData = await historyTestSchema.validateAsync(data, { abortEarly: true })
    validData.authId = new ObjectId(validData.authId)
    validData.lessonId = new ObjectId(validData.lessonId)
    const db = await GET_DB()
    const result = await db.collection('historyTest').insertOne(validData)
    return  await db.collection('historyTest').findOne({ _id: result.insertedId })
  } catch (error) {
    throw new Error(error)
  }

}
const update = async (id, data) => {
  try {
    const validData = await historyUpdateSchema.validateAsync(data, { abortEarly: true })
    if (validData.userId) validData.userId = new ObjectId(validData.userId)
    if (validData.lessonId) validData.lessonId = new ObjectId(validData.lessonId)
    const db = await GET_DB()
    await db.collection('historyStudy').updateOne({ _id: new ObjectId(id) }, { $set: validData })
    const historyStudy = await db.collection('historyStudy').findOne({ _id: new ObjectId(id) })
    return historyStudy
  } catch (error) {
    throw new Error(error)
  }
}
const getCollectionById = async ({ collection, id, option}) => {
  try {
    const db = await GET_DB()
    const user = await db.collection(collection).findOne({ [option]: new ObjectId(id) })
    return user
  } catch (error) {
    throw new Error(error)
  }
}
const getCollectionsById = async ({ collection, id, option}) => {
  try {
    const db = await GET_DB()
    const user = await db.collection(collection).find({ [option]: new ObjectId(id) }).toArray()
    return user
  } catch (error) {
    throw new Error(error)
  }
}
const deleteHistoryStudy = async (id) => {
  try {
    const db = await GET_DB()
    await db.collection('historyStudy').deleteOne({ _id: new ObjectId(id) })
    return true
  } catch (error) {
    throw new Error(error)
  }
}
export const HistoryStudyModel = {
  create,
  getCollectionById,
  getCollectionsById,
  update,
  deleteHistoryStudy,
  createHistoryTest
}