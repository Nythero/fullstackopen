import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Toggable from './Toggable'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

const Blogs = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const newBlog = (blogData) => {
    dispatch(addBlog(blogData))
  }

  return (
    <div className='px-3'>
      <h2 className='text-light'>blogs</h2>
      <Toggable ref={blogFormRef} openText='new blog' closeText='cancel'>
        <BlogForm
          addBlog={newBlog}
          blogFormRef={blogFormRef}/>
      </Toggable>
      <BlogList />
    </div>
  )
}

export default Blogs
