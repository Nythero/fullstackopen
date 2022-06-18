import { connect } from 'react-redux'
import { set } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const value = event.target.value
    props.set(value)
  }

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  set
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
