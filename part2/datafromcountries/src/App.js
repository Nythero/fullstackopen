import { useState, useEffect } from 'react'
import CountriesFinder from './CountriesFinder'
import Display from './Display'

import axios from 'axios'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const request = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(response.data)
    }
    request()
  }, [])

  const name = (country) => country.name.common

  return (
    <div>
      <CountriesFinder country={countryName} setCountry={setCountryName}/>
      <Display countries={countries.filter(country => name(country).includes(countryName))}/>
    </div>
  );
}

export default App;
