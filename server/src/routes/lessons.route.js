import express from 'express'
import { LessonsController } from '~/controllers/lessonsController'
import { verifyAdmin, verifyToken } from '~/middlewares/auth'
const Router = express.Router()
Router.post('/', verifyToken, LessonsController.handleCreateLesson)
Router.get('/', LessonsController.handleGetAllLessons)
Router.get('/all', LessonsController.handleGetAllActiveLessons)
Router.get('/user/:id', verifyToken, LessonsController.handleGetLessonByUserId)
Router.get('/:id', LessonsController.handleGetLessonById)
Router.delete('/:id', LessonsController.handleDeleteLessonById)
Router.patch('/:id', verifyToken, LessonsController.handleUpdateLessonById)
export const APILessons = Router