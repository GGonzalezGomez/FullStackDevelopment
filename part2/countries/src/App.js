import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Country from './Country'

const App = (props) => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setFilter ] = useState([])
  const [ weather, setWeather ] = useState([])

  const effectHook = () => {
	  axios
	    .get('https://restcountries.eu/rest/v2/all').then(response => {
		    setCountries(response.data)
	    })
  }

  useEffect(effectHook,[])

  const effectHookWeather = () => {
    var url="http://api.weatherstack.com/current?access_key=bfdf0c658108d2fd55fee549e6a38942&query=" + countries.filter(country => country.name.match(RegExp(".*"+newFilter+".*","i")))[0].capital
    axios
      .get(url).then(response => {
        setWeather(response.data.current)
    })

  }

  const handleFilter = (event) => {
	  setFilter(event.target.value)
    setWeather([])
  }

  const handleShow = (e) => {
    setFilter(e.target.id)
  }

  return (
    <div>
      <Filter changeFunction={handleFilter} filtervalue={newFilter} />
      <Country countries={countries.filter(country => country.name.match(RegExp(".*"+newFilter+".*","i")))} clickFunction={handleShow} hook={effectHookWeather} weather={weather} />
    </div>
  )
}


export default App
