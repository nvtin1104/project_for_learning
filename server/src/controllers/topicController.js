import { StatusCodes } from 'http-status-codes'
import { TopicService } from '../services/topicService'

const handleCreateTopic = async (req, res) => {
  try {
    const topic = await TopicService.createTopic(req.body)
    res.status(StatusCodes.CREATED).json(topic)
  } catch (error) {
    res.status(400).json({ error: error.message.replace('Error:', '') })
  }
}
const handleUpdateTopic = async (req, res) => {
  try {
    const topic = await TopicService.updateTopic(req.params.id, req.body)
    res.status(StatusCodes.OK).json(topic)
  } catch (error) {
    res.status(400).json({ error: error.message.replace('Error:', '') })
  }
}
const handleGetAllTopic = async (req, res) => {
  try {
    const topic = await TopicService.getAllTopic()
    res.status(StatusCodes.OK).json(topic)
  } catch (error) {
    res.status(400).json({ error: error.message.replace('Error:', '') })
  }
}
const handleGetTopicById = async (req, res) => {
  try {
    const topic = await TopicService.getTopicById(req.params.id)
    res.status(StatusCodes.OK).json(topic)
  } catch (error) {
    res.status(400).json({ error: error.message.replace('Error:', '') })
  }
}
const handleDeleteTopic = async (req, res) => {
  try {
    const { id } = req.params
    await TopicService.deleteTopic(id)
    res.status(StatusCodes.OK).json({
      message: `Topic with id ${id} has been deleted`
    })
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
export const TopicController= {
  handleCreateTopic,
  handleUpdateTopic,
  handleGetAllTopic,
  handleGetTopicById,
  handleDeleteTopic
}
