import React, { useState } from 'react'
import Numbers from './Numbers'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNumber = (event) => {
	  event.preventDefault()
	  if(newName !== ''){
		var copy = [...persons]
		copy.push({'name': newName})
		setPersons(copy)
		setNewName('')
	  }
  }

  const handleInputChange = (event) => {
	  setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
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