import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { getUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route//, Link
} from 'react-router-dom'
import Home from './components/Home'
import Users from './components/Users'
import NotificationMessage from './components/NotificationMessage'
import Logout from './components/Logout'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  useEffect(() => {
    dispatch(getUser())
  }, [])

  if(user !== null) {
    return (
      <Router>
        <h2>blogs</h2>
        <NotificationMessage />
        <p>{user.name} logged in</p>
        <Logout />
        <Routes>
          <Route path='/users' element={<Users />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    )
  }
  return <LoginForm />
}

export default App
