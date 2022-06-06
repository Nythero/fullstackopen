import userService from '../services/users'

const parsedUser = (user) => {
  const { blogs } = user
  const parsedBlogs = blogs.map(b => b.id)
  return {
    blogs: parsedBlogs,
    ...user
  }
}

const populateBlog = async (blog) => {
  const userId = blog.user
  const userResponse = await userService.get(userId)
  const pUser = parsedUser(userResponse)
  const updatedBlog = { ...blog, user: pUser }
  return updatedBlog
}

export default populateBlog
