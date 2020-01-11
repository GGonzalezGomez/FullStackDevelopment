const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{'username': 1,'name': 1, 'id': 1})
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response, next) => {
  if(request.body.title && request.body.url){

    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      const blog = new Blog(request.body)
      blog.user = decodedToken.id

      const user = await User.findById(decodedToken.id)
      const result = await blog.save()
      user.blogs = user.blogs.concat(result.id)
      await user.save()
      const blogInfo = await Blog.findById(result.id).populate('user',{'username': 1,'name': 1, 'id': 1})
      response.status(201).json(blogInfo)

    } catch(exception) {
      next(exception)
    }
  }
  else {
    response.status(400).json({error: 'content missing'})
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if(blog){
      if(blog.user.toString() === decodedToken.id){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      }
      else {
        response.status(400).json({error: 'User not authorised to delete this post'})
      }
    }

  } catch(exception) {
    next(exception)
  }
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