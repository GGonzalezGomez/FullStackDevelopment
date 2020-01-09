const morgan = require('morgan')

// Logging post and put received input data
morgan.token('postRequest', function(req, res) {
  if(req.method === 'POST' || req.method === 'PUT'){
    if(req.baseUrl !== '/api/users' && req.baseUrl !== '/api/login')
      return JSON.stringify(req.body)
    else {
      return JSON.stringify({'name': req.body.name, 'username': req.body.username})
    }
  }
  else
    return ' '
})


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}
  
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' }).end()
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }).end()
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  
  next(error)
}
  
module.exports = {
  unknownEndpoint,
  errorHandler,
  morgan,
  tokenExtractor
}