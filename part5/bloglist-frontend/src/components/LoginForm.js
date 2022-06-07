import loginService from '../services/login'
import blogService from '../services/blogs'
import notificationSetter from '../utils/notificationSetter'
import NotificationMessage from './NotificationMessage'

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

const LoginForm = ({ usernameState, passwordState, setUser, notificationState }) => {
  const [username, setUsername] = usernameState
  const [password, setPassword] = passwordState
  return (
    <div>
      <NotificationMessage notificationState={notificationState} />
      <form>
        <label>Username</label>
        <input value={username} onChange={handleChange(setUsername)} >
        </input>
        <br />
        <label>Password</label>
        <input value={password} onChange={handleChange(setPassword)} type='password'>
        </input>
        <br />
        <button
          onClick={handleClick(usernameState, passwordState, setUser, notificationState)}>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
