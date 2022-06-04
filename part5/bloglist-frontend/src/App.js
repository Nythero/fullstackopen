import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if(user !== null) {
    return <Blogs blogs={blogs} user={user}/>
  }
  return <LoginForm 
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    setUser={setUser}/>
}

export default App
