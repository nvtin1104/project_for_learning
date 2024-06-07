import { StatusCodes } from 'http-status-codes'
import { LessonsService } from '~/services/lessonsService'

const handleCreateLesson = async (req, res) => {
  try {
    const data = req.body;
    data.authId = req.user.userId;
    const lesson = await LessonsService.createLesson(data)
    res.status(StatusCodes.CREATED).json(lesson)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleGetAllLessons = async (req, res) => {
  try {
    const limit = req.query.limit || 10
    const page = req.query.page || 1
    const lessons = await LessonsService.getAllLessons({ limit, page })
    res.status(StatusCodes.OK).json(lessons)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleGetLessonById = async (req, res) => {
  try {
    const { id } = req.params
    const lesson = await LessonsService.getLessonsById(id)
    res.status(StatusCodes.OK).json(lesson)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleDeleteLessonById = async (req, res) => {
  try {
    const { id } = req.params
    const lesson = await LessonsService.deleteLessonById(id)
    res.status(StatusCodes.OK).json(lesson)
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleUpdateLessonById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) throw new Error('Id is required')
    const lesson = await LessonsService.updateLessonById(id, req.body)
    res.status(StatusCodes.OK).json(lesson)
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleGetAllActiveLessons = async (req, res) => {
  try {
    const limit = req.query.limit || 10
    const page = req.query.page || 1
    const topicId = req.query?.topicId
    const lessons = await LessonsService.getAllActiveLessons({ limit, page, topicId })
    res.status(StatusCodes.OK).json(lessons)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleGetLessonByUserId = async (req, res) => {
  try {
    const user = req.user
    const lessons = await LessonsService.getLessonsByUserId(user.userId)
    res.status(StatusCodes.OK).json(lessons)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
export const LessonsController = {
  handleCreateLesson,
  handleGetAllLessons,
  handleGetLessonById,
  handleDeleteLessonById,
  handleUpdateLessonById,
  handleGetAllActiveLessons,
  handleGetLessonByUserId
}