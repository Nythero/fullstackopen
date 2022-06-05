import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Logout from './components/Logout'

const App = () => {
  const blogsState = useState([])
  const [user, setUser] = useState(null)
  const usernameState = useState('')
  const passwordState = useState('')
  const titleState = useState('')
  const authorState = useState('')
  const urlState = useState('')
  const notificationState = useState(null)

  const setBlogs = blogsState[1]
  useEffect(() => {
    const setInitialBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    setInitialBlogs()
  }, [setBlogs])
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser) {
      const u = JSON.parse(loggedUser)
      setUser(u)
      blogService.setToken(u.token)
    }
  }, [])

  if(user !== null) {
    return (
      <>
        <Blogs 
          blogsState={blogsState}
          user={user}
          titleState={titleState}
          authorState={authorState}
          urlState={urlState}
          notificationState={notificationState} />
        <Logout setUser={setUser} notificationState={notificationState} />
      </>
    )
  }
  return <LoginForm 
    usernameState={usernameState}
    passwordState={passwordState}
    setUser={setUser}
    notificationState={notificationState} />
}

export default App
