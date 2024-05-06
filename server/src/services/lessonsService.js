import { LessonsModel } from '../models/lessonsModel'

const createLesson = async (data) => {
  try {
    const newLesson = await LessonsModel.create(data)
    return newLesson
  } catch (error) {
    throw new Error(error)
  }
}
const getLessonsById = async (id) => await LessonsModel.getOneById(id)
const deleteLessonById = async (id) => await LessonsModel.deleteLessonById(id)
const getAllLessons = async () => await LessonsModel.getAll()
export const LessonsService = {
  createLesson,
  getAllLessons,
  getLessonsById,
  deleteLessonById
}
