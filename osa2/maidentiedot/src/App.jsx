import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryDetails from './component/CountryDetails'
function App() {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [matches, setMatches] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)


  const [weather, setWeather] = useState(null)

useEffect(() => {
  if (!selectedCountry) return

  axios
    .get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude: selectedCountry.latlng[0],
        longitude: selectedCountry.latlng[1],
        current_weather: true
      }
    })
    .then(res => {
      setWeather(res.data.current_weather)
    })
}, [selectedCountry])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setAllCountries(res.data)
      })
  }, [])

  useEffect(() => {
    const q = value.trim().toLowerCase()

    if (q === '') {
      setMatches([])
      return
    }

    const filtered = allCountries.filter(c =>
      c.name.common.toLowerCase().includes(q)
    )
  
    setMatches(filtered)
  }, [value, allCountries])

  const countryToShow =
  selectedCountry ||
  (matches.length === 1 ? matches[0] : null)

  return (
    <div>
      <div>
  Find countries:{' '}
  <input
    value={value}
    onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {matches.length === 0 && null}

      {matches.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

    {matches.length > 1 && matches.length <= 10 && (
      <ul>
        {matches.map(country => (
          <li key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setSelectedCountry(country)}>
              show
            </button>
          </li>
        ))}
      </ul>
    )}


    {countryToShow && (
      <CountryDetails country={countryToShow} />
    )}
  </div>
  )
}

export default App
