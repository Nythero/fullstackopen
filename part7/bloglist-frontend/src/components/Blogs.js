import BlogForm from './BlogForm'
import BlogList from './BlogList'
import NotificationMessage from './NotificationMessage'
import Toggable from './Toggable'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

const Blogs = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const newBlog = (blogData) => {
    dispatch(addBlog(blogData))
  }

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage />
      <p>{user.name} logged in</p>
      <Toggable ref={blogFormRef} openText='new blog' closeText='cancel'>
        <BlogForm
          addBlog={newBlog}
          blogFormRef={blogFormRef}/>
      </Toggable>
      <BlogList user={user} />
    </div>
  )
}

export default Blogs
