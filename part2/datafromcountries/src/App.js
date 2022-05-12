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

  const areEqualNames = (name1, name2) => name1.toLowerCase() === name2.toLowerCase()

  const nameContains = (name1, name2) => name1.toLowerCase().includes(name2.toLowerCase())

  const countryExists = countries.find(country => areEqualNames(countryName, name(country)))

  const filterCondition = (country) => countryExists?
    areEqualNames(name(country), countryName):
    nameContains(name(country), countryName)
    
  return (
    <div>
      <CountriesFinder country={countryName} setCountry={setCountryName}/>
      <Display countries={countries.filter(filterCondition)} setCountry={setCountryName}/>
    </div>
  );
}

export default App;
