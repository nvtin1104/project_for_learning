import express from 'express'
import { HistoryStudyController } from '~/controllers/historyStudyController'
import { verifyToken } from '~/middlewares/auth'

const Router = express.Router()
Router.post('/', verifyToken, HistoryStudyController.handleCreateHistoryStudy)
Router.get('/user', verifyToken, HistoryStudyController.handleGetHistoryStudyByUserId)
Router.get('/lesson/:lessonId', verifyToken, HistoryStudyController.handleGetHistoryStudyByLessonId)
Router.patch('/:id', verifyToken, HistoryStudyController.handleUpdateHistoryStudy)
Router.delete('/:id', verifyToken, HistoryStudyController.handleDeleteHistoryById)
export const APIHistoryStudy = Router