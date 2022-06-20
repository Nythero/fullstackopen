import { useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { getUser } from './reducers/userReducer'

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
      <>
        <Blogs />
        <Logout />
      </>
    )
  }
  return <LoginForm />
}

export default App
