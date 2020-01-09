const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{'username': 1,'name': 1, 'id': 1})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  if(request.body.title && request.body.url){
    const users = await User.find({})
    //const user = users[0].toJSON()

    const blog = new Blog(request.body)
    blog.user = users[0].toJSON().id

    const result = await blog.save()
    users[0].blogs = users[0].blogs.concat(result.id)
    await users[0].save()
    response.status(201).json(result)
  }
  else {
    response.status(400).json({error: 'content missing'})
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id,{'author': request.body.author, 'url': request.body.url, 'title': request.body.title, 'likes': request.body.likes})
  if(result)
    response.json(result.toJSON()).status(200).end()
  else
    response.status(404).end()
})

blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id)
  if(blogs){
    response.json(blogs.toJSON())
  }
  else {
    response.status(404).end()
  }
})
  
module.exports = blogsRouter