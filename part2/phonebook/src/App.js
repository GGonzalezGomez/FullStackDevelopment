import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './Numbers'
import Filter from './Filter'
import Person from './Person'

const App = (props) => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setFilter ] = useState('')

  const effectHook = () => {
	  console.log("Running Effect Hook")
	  axios
	    .get('http://localhost:3001/persons').then(response => {
		    console.log('Response received')
		    setPersons(response.data)
	    })
  }

  useEffect(effectHook,[])

  const addNumber = (event) => {
	  event.preventDefault()
	  if(newName !== '' && newNumber !== '' ){
		if (persons.filter( function(p){return p.name.toLowerCase() === newName.toLowerCase() }).length >0 )
		  window.alert(`${newName} is already added to phonebook`)
		else {
		  var copy = [...persons]
		  copy.push({name: newName, number: newNumber})
		  setPersons(copy)
		  setNewName('')
		  setNewNumber('')
		}
	  }
  }

  const handleInputChange = (event) => {
	  setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
	  setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
	  setFilter(event.target.value)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeFunction={handleFilter} filtervalue={newFilter} />
      <h2>add a new</h2>
      <Person nameValue={newName} nameChange={handleInputChange} numValue={newNumber} numChange={handleNumberChange} submitPerson={addNumber} />
      <h2>Numbers</h2>
      <Numbers persons={persons.filter(person => person.name.match(RegExp("^"+newFilter+".*","i")))} />
    </div>
  )
}


export default App
