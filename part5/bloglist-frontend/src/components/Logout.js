const Logout = ({ setUser }) => {
  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }
  return <button onClick={logout}>Logout</button>
}

export default Logout
