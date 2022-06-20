import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
  }
  return <button onClick={logout}>Logout</button>
}

export default Logout
