const bcrypt = require('bcrypt')
const saltRounds = 10 // Độ phức tạp của salt

export const handleCreatePassword = async (password) => {
  try {
    // Tạo salt và hash mật khẩu
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (error) {
    // Handle error in a different way
    throw new Error('Error hashing password: ' + error)
  }
}
export const handleComparePassword = async (password, hash) => {
  try {
    // So sánh mật khẩu nhập và hash
    const isMatch = await bcrypt.compare(password, hash)
    return isMatch
  } catch (error) {
    // Handle error in a different way
    throw new Error('Error comparing password: ' + error)
  }
}