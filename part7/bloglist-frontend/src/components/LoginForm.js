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
    <div className="container">
      <NotificationMessage />
      <h2 className='text-light'>Login</h2>
      <form onSubmit={handleSubmit}>
        <label className='form-label text-light'>Username</label>
        <input className='form-control w-25' id='username' {...username}></input>
        <br />
        <label className='form-label text-light'>Password</label>
        <input className='form-control w-25' id='password' {...password}></input>
        <br />
        <button className='btn btn-dark btn-outline-light' id='login-button'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
