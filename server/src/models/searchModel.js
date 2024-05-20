import { GET_DB } from '~/config/mongodb'

const handleSearch = async ({ search, collection }) => {
  try {
    const db = await GET_DB()
    const query = { title: { $regex: `${search}`, $options: 'i' } }
    const projection = { title: 1, _id: 1, createdAt: 1 }
    const result = await db.collection(collection).find(query).project(projection).limit(5).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const SearchModel = {
  handleSearch
}
