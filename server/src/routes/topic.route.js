import express from 'express'
import { TopicController } from '~/controllers/topicController'
import { verifyAdmin, verifyToken } from '~/middlewares/auth'
const Router = express.Router()
Router.post('/', [verifyToken, verifyAdmin], TopicController.handleCreateTopic)
Router.patch('/:id', [verifyToken, verifyAdmin], TopicController.handleUpdateTopic)
Router.get('/', TopicController.handleGetAllTopic)
Router.get('/:id', TopicController.handleGetTopicById)
Router.delete('/:id', [verifyToken, verifyAdmin], TopicController.handleDeleteTopic)
export const APITopic = Router