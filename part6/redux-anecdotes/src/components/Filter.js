import { useDispatch } from 'react-redux'
import { set } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const value = event.target.value
    dispatch(set(value))
  }

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
