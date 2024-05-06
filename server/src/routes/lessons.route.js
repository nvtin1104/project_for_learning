import express from 'express'
import { LessonsController } from '~/controllers/lessonsController'
const Router = express.Router()
Router.post('/', LessonsController.handleCreateLesson)
Router.get('/', LessonsController.handleGetAllLessons)
Router.get('/:id', LessonsController.handleGetLessonById)
Router.delete('/:id', LessonsController.handleDeleteLessonById)
export const APILessons = Router