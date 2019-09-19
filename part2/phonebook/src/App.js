import React, { useState } from 'react'

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
  
  const handleFilterChange = (event) => {
          setFilter(event.target.value)
  }

  const Person = ({p}) => {
        return(
                <p>{p.name} {p.number}</p>
        )
  }

  const Printpersons = ({persons}) => persons.map(p => <Person p={p} key={p.name} />)

  const Numbers = ({persons}) => {
    //console.log(persons)
    return (
      <div>
        <h2>Numbers</h2>
        <Printpersons persons={persons} />
      </div>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>
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
      <Numbers persons={persons.filter(person => person.name.match(RegExp("^"+newFilter+".*","i")))} />
    </div>
  )
}


export default App
