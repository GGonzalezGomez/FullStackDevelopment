import React, { useState, useEffect } from 'react'
import { useResource } from './hooks/index'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const service = {
    reset
  }

  return {
    type,
    value,
    service,
    onChange
  }
}


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    const response = await noteService.create({ content: content.value })
    var tmp = [...notes]
    tmp.push(response)
    noteService.updateResources(tmp)
    content.service.reset()
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const response = await personService.create({ name: name.value, number: number.value})
    var tmp = [...persons]
    tmp.push(response)
    personService.updateResources(tmp)
    name.service.reset()
    number.service.reset()
  }

  const effectHook = () => {
    console.log("Running Effect Hook")
    noteService.getAll().then(response => noteService.updateResources(response))
    personService.getAll().then(response => personService.updateResources(response))
    console.log("Effect Hook Completed")
  }
  useEffect(effectHook,[])

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App