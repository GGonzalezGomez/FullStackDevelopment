console.log("Hello World!")

const express = require('express')
const app = express()

let persons = [
  {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
  },
  {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
  },
  {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
  },
  {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => {
  	//console.log(person.id, typeof person.id, id, typeof id, person.id === id)
  	return person.id === parseInt(id)
	})
  
  if (person) {
    response.json(person)
    //console.log(person)
  } else {
    console.log(id+' not found')
    response.status(404).end()
  }

})

app.get('/info', (request, response) => {
  response.send('<div><p>Phonebook has info for ' + persons.length + ' people</p><p>' + Date() + '</p></div>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
