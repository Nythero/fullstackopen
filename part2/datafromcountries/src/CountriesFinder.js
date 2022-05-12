const CountriesFinder = ({ country, setCountry }) => {
  const handleChange = (event) => {
    setCountry(event.target.value)
  }
  return <input value={country} onChange={handleChange} />
}

export default CountriesFinder
