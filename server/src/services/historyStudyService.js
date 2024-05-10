
import { LessonsModel } from '~/models/lessonsModel'
import { HistoryStudyModel } from '../models/historyStudyModel'
const createHistoryStudy = async (historyStudy) => {
  try {
    if (!historyStudy.userId) {
      throw new Error('Unauthorized')
    }
    if (!historyStudy.lessonId) {
      throw new Error('lessonId is required')
    }
    if (!historyStudy.history) {
      throw new Error('history is required')
    }
    const user = await HistoryStudyModel.getCollectionById({ collection: 'users', id: historyStudy.userId, option: '_id'})
    if (!user) {
      throw new Error('User not found')
    }
    const lesson = await HistoryStudyModel.getCollectionById({ collection: 'lessons', id: historyStudy.lessonId, option: '_id'})
    if (!lesson) {
      throw new Error('Lesson not found')
    }
    if (lesson.limit <= 0) {
      throw new Error('Lesson is full')
    }
    if (historyStudy.history.length === lesson.questions.length) {
      historyStudy.status = 'completed'
    }
    await LessonsModel.update(historyStudy.lessonId, { limit: lesson.limit - 1})
    const history = await HistoryStudyModel.create(historyStudy)
    return history
  } catch (error) {
    throw new Error(error)
  }
}
const updateHistoryStudy = async (id, historyStudy) => {
  try {
    const history = await HistoryStudyModel.getCollectionById({ collection: 'historyStudy', id, option: '_id' })
    if (!history) {
      throw new Error('History not found')
    }
    if (history.userId.toString() !== historyStudy.userId) {
      throw new Error('Unauthorized')
    }
    if (historyStudy.history.length === history.questions.length) {
      historyStudy.status = 'completed'
    }
    const updatedHistory = await HistoryStudyModel.update(id, historyStudy)
    return updatedHistory
  }
  catch (error) {
    throw new Error(error)
  }
}
const deleteHistoryStudyById = async (id, userId) => {
  const history = await HistoryStudyModel.getCollectionById({ collection: 'historyStudy', id, option: '_id' })
  if (!history) {
    throw new Error('History not found')
  }
  if (history.userId.toString() !== userId) {
    throw new Error('Unauthorized')
  }
  await HistoryStudyModel.deleteHistoryStudy(id)
  return true
}
const getHistoryStudyByUserId = async (userId) => await HistoryStudyModel.getCollectionsById({ collection: 'historyStudy', id: userId, option: 'userId' })
const getHistoryStudyByLessonId = async (lessonId) => await HistoryStudyModel.getCollectionsById({ collection: 'historyStudy', id: lessonId, option: 'lessonId' })
export const historyStudyService = {
  createHistoryStudy,
  getHistoryStudyByUserId,
  getHistoryStudyByLessonId,
  updateHistoryStudy,
  deleteHistoryStudyById
}