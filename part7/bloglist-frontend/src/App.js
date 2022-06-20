import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { getUser } from './reducers/userReducer'
import {
  Routes, Route//, Link
} from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import NotificationMessage from './components/NotificationMessage'
import Logout from './components/Logout'
import User from './components/User'
import BlogView from './components/BlogView'
import { removeBlog, likeBlog } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  useEffect(() => {
    dispatch(getUser())
  }, [])

  const handleDeleteClick = (blog) => async () => {
    const id = blog.id
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      return
    dispatch(removeBlog(id))
  }
  const handleLikeClick = (blog) => async () => {
    dispatch(likeBlog(blog))
  }

  if(user !== null) {
    return (
      <>
        <h2>blogs</h2>
        <NotificationMessage />
        <p>{user.name} logged in</p>
        <Logout />
        <Routes>
          <Route path='/blogs/:id' element={<BlogView
            handleLikeClick={handleLikeClick}
            handleDeleteClick={handleDeleteClick} />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/users' element={<Users />} />
          <Route path='/' element={<Blogs />} />
        </Routes>
      </>
    )
  }
  return <LoginForm />
}

export default App
