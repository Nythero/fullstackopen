import axios from 'axios'

const baseUrl = (blogId) => `/api/blogs/${blogId}/comments`

const post = async (comment, blogId) => {
  const commentData = { comment }
  const response = await axios.post(baseUrl(blogId), commentData)
  return response.data
}

const commentService = { post }

export default commentService
