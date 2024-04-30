import { LessonsModel } from '../models/lessonsModel'

const createLesson = async (data) => {
  try {
    const newLesson = await LessonsModel.create(data)
    return newLesson
  } catch (error) {
    throw new Error(error)
  }
}
export const LessonsService = {
  createLesson
}
