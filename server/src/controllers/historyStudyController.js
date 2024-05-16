import { StatusCodes } from 'http-status-codes'
import { historyStudyService } from '~/services/historyStudyService'

export const handleCreateHistoryStudy = async (req, res) => {
  try {
    const historyStudy = req.body
    historyStudy.userId = req.user.userId
    const history = await historyStudyService.createHistoryStudy(historyStudy)
    res.status(StatusCodes.CREATED).json(history)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
 const handleGetHistoryStudyByUserId = async (req, res) => {
 try {
    const userId = req.user.userId
    if (!userId) {
      throw new Error('userId is required')
    }
    const history = await historyStudyService.getHistoryStudyByUserId(userId)
    res.status(StatusCodes.OK).json(history)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
const handleGetHistoryStudyByLessonId = async (req, res) => {
  try {
    const lessonId = req.params.lessonId
    if (!lessonId) {
      throw new Error('lessonId is required')
    }
    const history = await historyStudyService.getHistoryStudyByLessonId(lessonId)
    res.status(StatusCodes.OK).json(history)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
const handleUpdateHistoryStudy = async (req, res) => {
  try {
    const id = req.params.id
    const historyStudy = req.body
    historyStudy.userId = req.user.userId
    const history = await historyStudyService.updateHistoryStudy(id, historyStudy)
    res.status(StatusCodes.OK).json(history)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
const handleDeleteHistoryById = async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.user.userId
    await historyStudyService.deleteHistoryStudyById(id, userId)
    res.status(StatusCodes.OK).json({
      message: 'History deleted'
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
export const HistoryStudyController = {
  handleCreateHistoryStudy,
  handleGetHistoryStudyByUserId,
  handleGetHistoryStudyByLessonId,
  handleUpdateHistoryStudy,
  handleDeleteHistoryById
}