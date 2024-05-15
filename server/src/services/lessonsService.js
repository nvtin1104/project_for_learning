import { LessonsModel } from '../models/lessonsModel'

const createLesson = async (data) => await LessonsModel.create(data)
const updateLessonById = async (id, data) => {
  const lesson = await LessonsModel.getOneById(id)
  if (!lesson) throw new Error('Lesson not found')
  const lessonUpdate = await LessonsModel.update(id, data)
  return {
    message: 'Lesson updated',
    lesson: lessonUpdate
  }
}
const getLessonsById = async (id) => await LessonsModel.getLessonById(id)
const deleteLessonById = async (id) => {
  const lesson = await LessonsModel.getOneById(id)
  if (!lesson) throw new Error('Lesson not found')
  await LessonsModel.deleteLessonById(id)
  return {
    message: 'Lesson deleted'
  }
}
const getAllActiveLessons = async ({ limit, page, topicId }) => await LessonsModel.getAllActiveLessons({ limit, page, topicId })
const getAllLessons = async ({ limit, page }) => await LessonsModel.getAllLessons({ limit, page })
const getLessonsByUserId = async (id) => await LessonsModel.getLessonsByUserId(id)
export const LessonsService = {
  createLesson,
  getAllActiveLessons,
  getLessonsById,
  deleteLessonById,
  updateLessonById,
  getAllLessons,
  getLessonsByUserId
}
