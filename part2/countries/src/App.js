import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Country from './Country'

const App = (props) => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setFilter ] = useState([]) 

  const effectHook = () => {
	  console.log("Running Effect Hook")
	  axios
	    .get('https://restcountries.eu/rest/v2/all').then(response => {
		    console.log('Response received')
		    setCountries(response.data)
	    })
  }

  useEffect(effectHook,[])

  const handleFilter = (event) => {
	  setFilter(event.target.value)
  }

  const handleShow = (e) => {
    setFilter(e.target.id)
  }

console.log(newFilter)
  return (
    <div>
      <Filter changeFunction={handleFilter} filtervalue={newFilter} />
      <Country countries={countries.filter(country => country.name.match(RegExp(".*"+newFilter+".*","i")))} clickFunction={handleShow} />
    </div>
  )
}


export default App
