import React, { useState } from 'react'
import Numbers from './Numbers'
import Filter from './Filter'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const addNumber = (event) => {
	  event.preventDefault()
	  if(newName !== '' && newNumber !== '' ){
		if (persons.filter( function(p){return p.name === newName }).length >0 )
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

  return (
    <div>
      <Filter persons={persons} />
      <h2>add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
	<div>
	  number: <input value={newNumber} onChange={handleNumberChange} />
	</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )
}

export default App
