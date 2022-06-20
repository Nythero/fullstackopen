import NotificationMessage from './NotificationMessage'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(username.value, password.value))
    resetUsername()
    resetPassword()
  }
  return (
    <div>
      <NotificationMessage />
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input id='username' {...username}></input>
        <br />
        <label>Password</label>
        <input id='password' {...password}></input>
        <br />
        <button id='login-button'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
