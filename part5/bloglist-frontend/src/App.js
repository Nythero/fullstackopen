import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Logout from './components/Logout'

const App = () => {
  const blogsState = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const titleState = useState('')
  const authorState = useState('')
  const urlState = useState('')

  useEffect(() => {
    const setBlogs = blogsState[1]
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])
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
          urlState={urlState}/>
        <Logout setUser={setUser} />
      </>
    )
  }
  return <LoginForm 
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    setUser={setUser}/>
}

export default App
