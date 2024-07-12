import { emailRegex } from '~/utils/regex';

const bcrypt = require('bcrypt')
const saltRounds = 10 // Độ phức tạp của salt

export const handleCreatePassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
  } catch (error) {
    // Handle error in a different way
    throw new Error('Error hashing password: ' + error)
  }
}
export const handleComparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    // Handle error in a different way
    console.log(error)
    return false
  }
}
export  const randomPassword = async () => {
  try {
    const random = Math.random().toString(8).slice(-8)
    const password = await handleCreatePassword(random)
    return { random, password }
  } catch (error) {
    throw new Error('Error generating random password: ' + error)
  }
}