import React, { useState } from 'react'
import Numbers from './Numbers'
import Filter from './Filter'
import Person from './Person'

const App = (props) => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setFilter ] = useState('')

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
