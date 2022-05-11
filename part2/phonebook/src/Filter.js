const Filter = ({ filterName, onChange }) => <div>
    <p>Search by name</p>
    <input value={filterName} onChange={onChange} />
  </div>

export default Filter
