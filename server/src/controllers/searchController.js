
import { SearchModel } from '../models/searchModel'
const handleSearchLessons = async (req, res) => {
  try {
    const { search } = req.body
    const result = await SearchModel.handleSearch({
      search,
      collection: 'lessons'
    })
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export const SearchController = {
  handleSearchLessons
}