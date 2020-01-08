const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if(blog.title && blog.url){
    const result = await blog.save()    
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
  
module.exports = blogsRouter