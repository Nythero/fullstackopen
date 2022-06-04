import loginService from '../services/login'

const handleChange = (setter) => (event) => setter(event.target.value)

const handleClick = (username, password, setUser, setUsername, setPassword) => async (event) => {
  event.preventDefault()
  const token = await loginService.login(username, password)
  setUsername('')
  setPassword('')
  setUser(token)
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
