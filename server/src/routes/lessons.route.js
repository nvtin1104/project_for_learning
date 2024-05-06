import express from 'express'
import { LessonsController } from '~/controllers/lessonsController'
const Router = express.Router()
Router.post('/', LessonsController.handleCreateLesson)
Router.get('/', LessonsController.handleGetAllLessons)
Router.get('/all', LessonsController.handleGetAllActiveLessons)
Router.get('/user/:id', LessonsController.handleGetLessonByUserId)
Router.get('/:id', LessonsController.handleGetLessonById)
Router.delete('/:id', LessonsController.handleDeleteLessonById)
Router.patch('/:id', LessonsController.handleUpdateLessonById)
export const APILessons = Router