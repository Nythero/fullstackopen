import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
  }
  return <button className='btn btn-outline-light'
    onClick={logout}>Logout</button>
}

export default Logout
