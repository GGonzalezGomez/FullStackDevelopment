const morgan = require('morgan')

// Logging post and put received input data
morgan.token('postRequest', function(req, res) {
  if(req.method === 'POST' || req.method === 'PUT')
    return JSON.stringify(req.body)
  else
    return ' '
})

  
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  next(error)
}
  
module.exports = {
  unknownEndpoint,
  errorHandler,
  morgan
}