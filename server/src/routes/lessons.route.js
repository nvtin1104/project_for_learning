import express from 'express'
import { LessonsController } from '~/controllers/lessonsController'
const Router = express.Router()
Router.post('/', LessonsController.handleCreateLesson)
export const APILessons = Router