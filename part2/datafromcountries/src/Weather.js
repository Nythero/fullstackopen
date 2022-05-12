import { useState, useEffect } from 'react'
import axios from 'axios'

const normalizedWeather = (weather) => ({
  temperature: weather.main.temp,
  icon: weather.weather[0].icon,
  description: weather.weather[0].description
})

const isEmpty = (object) => (Object.entries(object).length === 0)

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const doRequest = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      const weatherN = normalizedWeather(response.data)
      setWeather(weatherN)
    }
    doRequest()
  }, [])

  const name = (country) => country.name.common
  if(!isEmpty(weather)){
    return (
      <div>
        <h3>The weather in {country.name}</h3>
        <p>The temperature is {weather.temperature}</p>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='Weather Icon' />
        <p>{weather.description}</p>
      </div>
    )
  }
}

export default Weather
