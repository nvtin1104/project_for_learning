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
export const HistoryTestController = {
  handleCreateHistoryTest
}