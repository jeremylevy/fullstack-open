import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchRequestResults = ({ searchRequestError, searchRequest, countries, showCountry }) => {
  if (searchRequest) {
    return <p>loading...</p>
  }

  if (searchRequestError) {
    return (
      <p>
        <strong>Request error: </strong>
        {searchRequestError.response && searchRequestError.response.statusText || searchRequestError.message}
      </p>
    )
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length !== 1) {
    return <Countries countries={countries} showCountry={showCountry} />
  }

  return <Country country={countries[0]} />
}

const Countries = ({ countries, showCountry }) => (
  countries.map(country => {
    return (
      <div key={country.name.common}>
        {country.name.common}
        &nbsp;
        <button onClick={() => showCountry(country)}>show</button>
      </div>
    )
  })
)

const Country = ({ country }) => {
  const countryName = country.name.common
  const countryCapital = country.capital && country.capital[0]

  const [countryWeather, setCountryWeather] = useState()

  useEffect(() => {
    // Remove weather of previous loaded country
    setCountryWeather(undefined)

    if (!countryCapital) {
      return
    }

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(countryCapital)}&units=metric&appid=${encodeURIComponent(process.env.REACT_APP_API_KEY)}`)
      .then(response => {
        setCountryWeather(response.data)
      })
      .catch(err => console.log(err))
  }, [country])

  return (
    <div>
      <h1>{countryName}</h1>
      
      <p>capital {countryCapital || "undefined"}</p>
      <p>population {country.population}</p>
      
      <h2>Spoken languages</h2>
      
      <ul>
        {
          Object
            .values(country.languages)
            .map(language => <li key={language}>{language}</li>)
        }
      </ul>
      
      <p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </p>

      { countryWeather ? <CountryWeather country={country} weather={countryWeather} /> : null }
    </div>
  )
}

const CountryWeather = ({ country, weather }) => {
  return (
    <div>
      <h2>Weather in { country.capital[0] }</h2>

      <p>
        <strong>temperature: </strong>
        { weather.main.temp }
        &nbsp;
        Celsius
      </p>

      <p>
        <strong>wind: </strong>
        { weather.wind.speed }
        &nbsp;
        mph
      </p>
    </div>
  )
}

let searchRequest = null
const App = () => {
  const [countryToShow, setCountryToShow] = useState(null)
  const [countries, setCountries] = useState([])

  const [searchTerms, setSearchTerms] = useState('')
  const [searchRequestError, setSearchRequestError] = useState(null)

  const showCountry = (country) => setCountryToShow(country)

  const handleSearchInputChange = (event) => {
    const searchTerms = event.target.value

    // Prevent stale state if previous requests 
    // ends after current one
    if (searchRequest) {
      searchRequest.abort()
      searchRequest = null
    }

    if (searchTerms) {
      searchRequest = new AbortController()

      axios
        .get(`https://restcountries.com/v3.1/name/${encodeURIComponent(searchTerms)}`, {
          signal: searchRequest.signal
        })
        .then(response => {
          searchRequest = null
          setCountries(response.data)
        })
        .catch(err => {
          const isAborted = !err.response && !err.request

          if (isAborted) {
            return
          }

          searchRequest = null

          setSearchRequestError(err)
          console.log(err)
        })
    }

    setSearchTerms(searchTerms)
    setSearchRequestError(null)

    setCountries([])
    setCountryToShow(null)
  }

  return (
    <div>
      <p>
        find countries&nbsp;
        <input onChange={handleSearchInputChange} value={searchTerms} />
      </p>

      <SearchRequestResults 
        searchRequestError={searchRequestError} 
        searchRequest={searchRequest} 
        countries={countries} 
        showCountry={showCountry}
      />

      { countryToShow ? <Country country={countryToShow} /> : null }
    </div>
  )
}

export default App
