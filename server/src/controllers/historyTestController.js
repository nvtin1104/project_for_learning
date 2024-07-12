import { StatusCodes } from 'http-status-codes'
import { HistoryStudyModel } from '~/models/historyStudyModel';

const handleCreateHistoryTest = async (req, res) => {
  try {
    const historyTest = req.body
    const history = await HistoryStudyModel.createHistoryTest(historyTest)
    res.status(StatusCodes.CREATED).json(history)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
const handleGetHistory = async (req, res) => {
  try {
    const { id } = req.params
    const history = await HistoryStudyModel.handleGetHistory(id, 'historyTest')
    res.status(StatusCodes.OK).json(history)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
export const HistoryTestController = {
  handleCreateHistoryTest,
  handleGetHistory
}