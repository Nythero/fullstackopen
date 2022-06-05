import blogService from '../services/blogs'
import notificationSetter from '../utils/notificationSetter'

const Logout = ({ setUser, notificationState }) => {
  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogUser')
    const setNotification = notificationSetter(notificationState)
    setNotification('notificationSuccess', 'logged out')
  }
  return <button onClick={logout}>Logout</button>
}

export default Logout
