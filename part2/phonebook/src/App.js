import React, { useState, useEffect } from 'react'
import Numbers from './Numbers'
import Filter from './Filter'
import Person from './Person'
import Comm from './Comm'

const App = (props) => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setFilter ] = useState('')

  const effectHook = () => {
	  console.log("Running Effect Hook")
	  Comm.getAll().then(contactsData => {
		console.log('Response received')
		setPersons(contactsData)
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
        	    Comm.create({name: newName, number: newNumber}).then(response => {
            		setPersons(copy)
            		setNewName('')
            		setNewNumber('')
            	    }
          	   )
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

  const handleDelete = (event) => {
	  console.log('Delete contact')
	  var contactToDelete = persons.filter((p) => p.id===parseInt(event.target.id))
	  console.log(event.target.id)
	  console.log(contactToDelete)
	  if(window.confirm('Delete ' + contactToDelete[0].name + '?')) {
		  var copy = persons.filter( (p) => p.id!==parseInt(event.target.id))
		  Comm.delContact(contactToDelete[0].id).then(response => {
			  setPersons(copy)
			  setNewName('')
			  setNewNumber('')
		  	  })
	  }
	  else {
		  console.log('Deletion canceled')
	  }
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeFunction={handleFilter} filtervalue={newFilter} />
      <h2>add a new</h2>
      <Person nameValue={newName} nameChange={handleInputChange} numValue={newNumber} numChange={handleNumberChange} submitPerson={addNumber} />
      <h2>Numbers</h2>
      <Numbers persons={persons.filter(person => person.name.match(RegExp("^"+newFilter+".*","i")))} deleteContact={handleDelete} />
    </div>
  )
}


export default App
