import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const post = async (blogData) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blogData, config)

  return response
}

const put = async (id, blogData) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, blogData, config)

  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const setToken = (t) => {
  token = `bearer ${t}`
}

const blogService = { getAll, post, setToken, put, remove }

export default blogService
