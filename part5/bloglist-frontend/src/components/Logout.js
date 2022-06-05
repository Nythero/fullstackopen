import blogService from '../services/blogs'

const Logout = ({ setUser }) => {
  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogUser')
  }
  return <button onClick={logout}>Logout</button>
}

export default Logout
