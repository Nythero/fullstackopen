import BlogForm from './BlogForm'
import BlogList from './BlogList'
import NotificationMessage from './NotificationMessage'
import Toggable from './Toggable'
import { useRef } from 'react'

const Blogs = ({ user, ...states }) => {
  const { blogsState, notificationState } = states
  const blogFormRef = useRef()
  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage notificationState={notificationState}/>
      <p>{user.name} logged in</p>
      <Toggable ref={blogFormRef}>
        <BlogForm states={states} blogFormRef={blogFormRef}/>
      </Toggable>
      <BlogList blogsState={blogsState} user={user} />
    </div>
  )
}

export default Blogs
