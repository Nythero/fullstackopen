import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from '../components/Logout'

const Menu = () => {
  const user = useSelector(state => state.user)

  return (
    <nav className='navbar navbar-dark bg-dark justify-content-start'>
      <Link className='nav-link link-light' to='/'>blogs</Link>
      <Link className='nav-link link-light' to='/users'>users</Link>
      <p className='navbar-text mb-0 px-3 text-light'>{user.name} logged in</p>
      <Logout />
    </nav>
  )
}

export default Menu
