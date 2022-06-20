import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from '../components/Logout'

const Menu = () => {
  const user = useSelector(state => state.user)

  return (
    <div style={{ display: 'flex', flexDirection:'row' }}>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      <p>{user.name} logged in</p>
      <Logout />
    </div>
  )
}

export default Menu
