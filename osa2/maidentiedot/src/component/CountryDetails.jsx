import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!country.latlng) return

    const [lat, lon] = country.latlng

    axios
      .get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true
        }
      })
      .then(res => {
        setWeather(res.data.current_weather)
      })
  }, [country])

  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>capital {country.capital?.[0]}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="150"
      />

      <h3>Weather in {country.name.common}</h3>

      {weather ? (
        <div>
          <div>temperature {weather.temperature} Celsius</div>
          <div>wind {weather.windspeed} m/s</div>
        </div>
      ) : (
        <div>Loading weather...</div>
      )}
    </div>
  )
}

export default CountryDetails
