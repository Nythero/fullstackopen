import axios from 'axios'
const baseUrl = '/api/users'

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const userService = { get }

export default userService
