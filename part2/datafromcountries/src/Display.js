const name = (country) => country.name.common

const countryNormalized = (country) => ({
  name: country.name.common,
  capitals: country.capital,
  languages: country.languages,
  currencies: country.currencies,
  flag: country.flags.png
})

const Capital = ({ country }) => (
  <div>
    <h3>Capital</h3>
    {country.capitals.map(capital => <p key={capital}>{capital}</p>)}
  </div>
)

const Languages = ({ country }) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h3>{(languages.length===1)?'Language':'Languages'}</h3>
      {languages.map(language => <p key={language}>{language}</p>)}
    </div>
  )
}

const Currencies = ({ country }) => {
  const currencies = Object.values(country.currencies)

  return (
    <div>
      <h3>{(currencies.length===1)?'Currency':'Currencies'}</h3>
      {currencies.map(({ name }) => <p key={name}>{name}</p>)}
    </div>
  )
}

const Country = ({ country }) => {
  const countryN = countryNormalized(country)
  
  return (
    <div>
      <h2>{countryN.name}</h2>
      <Capital country={countryN} />
      <Languages country={countryN} />
      <Currencies country={countryN} />
      <img src={countryN.flag} alt={`${countryN.name}'s flag`} />
    </div>
  )
}

const Countries = ({ countries }) => countries.map(country => <p key={name(country)}>{name(country)}</p>)

const Display = ({ countries }) => {
  if(countries.length === 1){
    return <Country country={countries[0]} />
  }
  else if(countries.length === 0) {
    return <p>No countries found.</p>
  }
  else if(countries.length > 10) {
    return <p>Too many countries. Narrow the search.</p>
  }
  else {
    return <Countries countries={countries} />
  }
}

export default Display
