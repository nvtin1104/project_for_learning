import { StatusCodes } from 'http-status-codes'
import { LessonsService } from '~/services/lessonsService'

const handleCreateLesson = async (req, res) => {
  try {
    const lesson = await LessonsService.createLesson(req.body)
    res.status(StatusCodes.CREATED).json(lesson)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleGetAllLessons = async (req, res) => {
  try {
    const lessons = await LessonsService.getAllLessons()
    res.status(StatusCodes.OK).json(lessons)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleGetLessonById = async (req, res) => {
  try {
    const {id} = req.params
    const lesson = await LessonsService.getLessonsById(id)
    res.status(StatusCodes.OK).json(lesson)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleDeleteLessonById = async (req, res) => {
  try {
    const {id} = req.params
    const lesson = await LessonsService.deleteLessonById(id)
    res.status(StatusCodes.OK).json(lesson)
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
export const LessonsController = {
  handleCreateLesson,
  handleGetAllLessons,
  handleGetLessonById,
  handleDeleteLessonById
}