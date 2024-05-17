import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const topicSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500),
  image: Joi.string().min(3).max(500),
  subject: Joi.array().items(Joi.string().min(3).max(100)).required(),
  createdAt: Joi.date().default(Date.now()),
  updatedAt: Joi.date().default(null)
})
const topicUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(500),
  image: Joi.string().min(3).max(500),
  subject: Joi.array().items(Joi.string().min(3).max(100)),
  updatedAt: Joi.date().default(Date.now())
})
const create = async (data) => {
  try {
    const validateData = await topicSchema.validateAsync(data, { abortEarly: true })
    const db = await GET_DB()
    const result = await db.collection('topics').insertOne(validateData)
    const topic = await db.collection('topics').findOne({ _id: result.insertedId })
    return topic
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (id, data) => {
  try {
    const validateData = await topicUpdateSchema.validateAsync(data, { abortEarly: true })
    const db = await GET_DB()
    await db.collection('topics').updateOne({ _id: new ObjectId(id) }, { $set: validateData })
    const topic = await db.collection('topics').findOne({ _id: new ObjectId(id) })
    return topic
  } catch (error) {
    throw new Error(error)
  }
}
const getTopicById = async (id) => {
  try {
    const db = await GET_DB()
    const topic = await db.collection('topics').findOne({ _id: new ObjectId(id) })
    return topic
  } catch (error) {
    throw new Error(error)
  }
}
const getAllTopic = async () => {
  try {
    const db = await GET_DB()
    const topics = await db.collection('topics').find().toArray()
    return topics
  } catch (error) {
    throw new Error(error)
  }
}
const deleteTopic = async (id) => {
  try {
    const db = await GET_DB()
    await db.collection('topics').deleteOne({ _id: new ObjectId(id) })
    return true
  } catch (error) {
    throw new Error(error)
  }
}
export const TopicModel = {
  create,
  update,
  getTopicById,
  getAllTopic,
  deleteTopic
}