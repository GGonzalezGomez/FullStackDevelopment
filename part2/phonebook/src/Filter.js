import React, { useState } from 'react'

const Filter = ({persons}) => {

  const [ newFilter, setFilter ] = useState('')

  const handleInputChange = (event) => {
	  setFilter(event.target.value)
  }
  
  const addFilter = (event) => {
	  event.preventDefault()
  }

  return (
    <div>
      	<h2>Phonebook</h2>
	<form onSubmit={addFilter}>
          <div>
            filter shown with: <input value={newFilter} onChange={handleInputChange} />
          </div>
	</form>
    </div>
  )
}

export default Filter

