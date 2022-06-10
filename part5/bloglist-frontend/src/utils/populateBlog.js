import userService from '../services/users'

const parsedUser = (user) => {
  const pUser = {
    username: user.username,
    name: user.name,
    id: user.id
  }
  return pUser
}

const populateBlog = async (blog) => {
  const userId = blog.user
  const userResponse = await userService.get(userId)
  const pUser = parsedUser(userResponse)
  const updatedBlog = { ...blog, user: pUser }
  return updatedBlog
}

export default populateBlog
