import loginService from '../services/login'
import blogService from '../services/blogs'
import notificationSetter from '../utils/notificationSetter'
import NotificationMessage from './NotificationMessage'
import { useState } from 'react'

const handleChange = (setter) => (event) => setter(event.target.value)

const handleClick = (usernameState, passwordState, setUser, notificationState) => async (event) => {
  const [username, setUsername] = usernameState
  const [password, setPassword] = passwordState
  const setNotification = notificationSetter(notificationState)
  event.preventDefault()
  try {
    const token = await loginService.login(username, password)
    setUser(token)
    blogService.setToken(token.token)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(token))
    setNotification('notificationSuccess', `logged in as ${username}`)
  }
  catch(err) {
    if(err.name === 'AxiosError') {
      const response = err.response
      console.log(response.status, response.data)
      setNotification('notificationError', response.data.error)
    }
    else {
      console.log(err)
      setNotification('notificationError', 'couldn\'t login, try again later')
    }
  }
  finally {
    setUsername('')
    setPassword('')
  }
}

const LoginForm = ({ setUser, notificationState }) => {
  const usernameState = useState('')
  const passwordState = useState('')
  const [username, setUsername] = usernameState
  const [password, setPassword] = passwordState
  const notification = notificationState[0]
  return (
    <div>
      <NotificationMessage notification={notification} />
      <form>
        <label>Username</label>
        <input id='username' value={username} onChange={handleChange(setUsername)} >
        </input>
        <br />
        <label>Password</label>
        <input id='password' value={password} onChange={handleChange(setPassword)} type='password'>
        </input>
        <br />
        <button id='login-button'
          onClick={handleClick(usernameState, passwordState, setUser, notificationState)}>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
