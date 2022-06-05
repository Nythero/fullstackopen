import loginService from '../services/login'
import blogService from '../services/blogs'

const handleChange = (setter) => (event) => setter(event.target.value)

const handleClick = (username, password, setUser, setUsername, setPassword) => async (event) => {
  event.preventDefault()
  const token = await loginService.login(username, password)
  setUsername('')
  setPassword('')
  setUser(token)
  if(token === null)
    return
  blogService.setToken(token.token)
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(token))
}

const LoginForm = ({ username, setUsername, password, setPassword, setUser }) => {
  return (
    <div>
      <form>
        <label>Username</label>
        <input value={username} onChange={handleChange(setUsername)} >
        </input>
        <label>Password</label>
        <input value={password} onChange={handleChange(setPassword)} type='password'>
        </input>
        <button 
          onClick={handleClick(username, password, setUser, setUsername, setPassword)}>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
