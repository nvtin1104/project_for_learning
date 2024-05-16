import { TopicModel } from '../models/topicModel'
const createTopic = async (topic) => {
  try {
    if (!topic) throw new Error('Topic data is required')
    const result = await TopicModel.create(topic)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const updateTopic = async (id, topic) => {
  try {
    if (!id) throw new Error('Id is required')
    if (!topic) throw new Error('Topic data is required')
    const data = await TopicModel.getTopicById(id)
    if (!data) throw new Error('Topic not found')
    const result = await TopicModel.update(id, topic)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getTopicById = async (id) => {
  try {
    if (!id) throw new Error('Id is required')
    const result = await TopicModel.getTopicById(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getAllTopic = async () => await TopicModel.getAllTopic()
const deleteTopic = async (id) => {
  try {
    if (!id) throw new Error('Id is required')
    const data = await TopicModel.getTopicById(id)
    if (!data) throw new Error('Topic not found')
    const result = await TopicModel.deleteTopic(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const TopicService = {
  createTopic,
  updateTopic,
  getTopicById,
  getAllTopic,
  deleteTopic
}
