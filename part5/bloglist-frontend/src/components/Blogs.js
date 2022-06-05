import BlogForm from './BlogForm'
import BlogList from './BlogList'
import NotificationMessage from './NotificationMessage'

const Blogs = ({ user, ...states }) => {
  const { blogsState, notificationState } = states
  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage notificationState={notificationState}/>
      <p>{user.name} logged in</p>
      <BlogForm states={states} />
      <BlogList blogsState={blogsState} />
    </div>
  )
}

export default Blogs
