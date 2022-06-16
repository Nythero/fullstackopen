import BlogForm from './BlogForm'
import BlogList from './BlogList'
import NotificationMessage from './NotificationMessage'
import Toggable from './Toggable'
import { useRef } from 'react'
import blogService from '../services/blogs'
import populateBlog from '../utils/populateBlog'
import notificationSetter from '../utils/notificationSetter'

const postBlog = async (blogData) => {
  const response = await blogService.post(blogData)
  return response.data
}

const concatBlog = (blog, blogsState) => {
  const [blogs, setBlogs] = blogsState
  setBlogs(blogs.concat(blog))
}

const addBlogInsecure = async (blogData, blogsState) => {
  const blogResponse = await postBlog(blogData)
  const blog = await populateBlog(blogResponse)
  concatBlog(blog, blogsState)
  return blog
}

const handleAddError = (err, setNotification) => {
  if(err.name === 'AxiosError') {
    const response = err.response
    console.log(response.status, response.data)
    setNotification('notificationError', response.data.error)
  }
  else {
    console.log(err)
    setNotification(
      'notificationError',
      'couldn\'t add the blog, try again later')
  }
}

const Blogs = ({ user, blogsState, notificationState }) => {
  const blogFormRef = useRef()
  const setNotification = notificationSetter(notificationState)
  const notification = notificationState[0]

  const addBlog = async (blogData) => {
    try {
      const blog = await addBlogInsecure(blogData, blogsState)
      setNotification('notificationSuccess', `added blog '${blog.title}'`)
    }
    catch (err) {
      handleAddError(err, setNotification)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage notification={notification}/>
      <p>{user.name} logged in</p>
      <Toggable ref={blogFormRef} openText='new blog' closeText='cancel'>
        <BlogForm
          addBlog={addBlog}
          blogFormRef={blogFormRef}/>
      </Toggable>
      <BlogList blogsState={blogsState} user={user} />
    </div>
  )
}

export default Blogs
