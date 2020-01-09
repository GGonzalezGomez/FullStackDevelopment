const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next) => {
  try{
    if(request.body.username && request.body.password){
      if(request.body.password.length<3){
        var e = new Error('Password is shorter than the minimum allowed length (3).')
        e.name = 'ValidationError'
        throw(e)
      }
    
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
  
      const user = new User({
        username: request.body.username,
        name: request.body.name,
        passwordHash: passwordHash
      })

      const savedUser = await user.save()
      response.status(201).json(savedUser).end()
    }
    else{
      response.status(400).json({error: 'content missing'})
    }
  }
  catch(exception){
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
  
module.exports = usersRouter