const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('postRequest', function(req, res) {
        if(req.method === 'POST' || req.method === 'PUT')
                return JSON.stringify(req.body)
        else
                return ' '
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Endpoint not found' })
}

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postRequest'))


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

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  if(!request.body.number){
          return response.status(400).json({error: 'content missing'})
  }

  if(persons.filter(person => person.id === parseInt(id)).length === 0) {
          return response.status(400).json({error: 'Contact not found'})
  }

  persons = persons.map( p => {
	  if(p.id === parseInt(id))
	    return({"name": request.body.name, "number": request.body.number, "id": p.id})
	  else
	    return({"name": p.name, "number": p.number, "id": p.id})
    })
  response.status(204).end()

})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== parseInt(id) )
  response.status(204).end()
})


app.get('/info', (request, response) => {
  response.send('<div><p>Phonebook has info for ' + persons.length + ' people</p><p>' + Date() + '</p></div>')
})


app.post('/api/persons', (req, res) => {

  if(!req.body.name || !req.body.number){
          return res.status(400).json({error: 'content missing'})
  }

  if(persons.filter(person => person.name === req.body.name).length != 0) {
          return res.status(400).json({error: 'name must be unique'})
  }

  var newPerson = {"name": req.body.name, "number": req.body.number, "id": Math.ceil(Math.random()*100000)}
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
