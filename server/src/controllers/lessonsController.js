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
export const LessonsController = {
  handleCreateLesson
}