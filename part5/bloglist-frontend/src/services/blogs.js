import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const post = async (blogData) => {
  const config = { headers: { Authorization: token }}
  const response = await axios.post(baseUrl, blogData, config)

  return response
}

const setToken = (t) => {
  token = `bearer ${t}`
}

const blogService = { getAll, post, setToken }

export default blogService
