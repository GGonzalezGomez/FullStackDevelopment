require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('../models/Person')

// Logging post and put received input data
morgan.token('postRequest', function(req, res) {
  if(req.method === 'POST' || req.method === 'PUT')
    return JSON.stringify(req.body)
  else
    return ' '
})

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postRequest'))

// Root web access
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// API: Listing all contacts
app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(people => {
    res.json(people.map(p => p.toJSON() ))
  })
  .catch(error => {
    next(error)
  })
})

// API: Listing a specific contact
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if(person){
        response.json(person.toJSON())
      }
      else {
        response.status(404).end() 
      }
    })
    .catch(error => {
      next(error)
    })
})

// API: Updating specific contact
app.put('/api/persons/:id', (request, response, next) => {
  if(!request.body.number){
          return response.status(400).json({error: 'content missing'})
  }

  Person.findByIdAndUpdate(request.params.id,{"name": request.body.name, "number": request.body.number})
    .then(result => {
      if(result)
        response.json(result.toJSON())
      else
        response.status(404).end()
    })
    .catch(error => {
      next(error)
    })
})

// API: Deleting specific contact
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

// Phonebook info
app.get('/info', (request, response, next) => {
  Person.find({}).then(people => {    
    response.send('<div><p>Phonebook has info for ' + people.length + ' people</p><p>' + Date() + '</p></div>')
  })
  .catch(error => {
    next(error)
  })
})

// API: Posting a new contact info
app.post('/api/persons', (req, res, next) => {

  if(!req.body.name || !req.body.number){
    return res.status(400).json({error: 'content missing'})
  }

  const contact = new Person({
		name: req.body.name,
		number: req.body.number
	})

	contact.save().then(p => {
    res.json(p.toJSON())
  })
  .catch(error => {
    next(error)
  })
  
})

// Handling not found endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Endpoint not found' })
}

// Using not defined endpoint
app.use(unknownEndpoint)

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if(error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if(error.name === 'ValidationError'){
    return response.status(400).json({"error": error.message})
  }

  next(error)
}

app.use(errorHandler)

// Listener
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
