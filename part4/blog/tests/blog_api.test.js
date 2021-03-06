const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs count is correct', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(1)
})

test('id field exists', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('new posts are correct', async () => {
  // Get current post count
  const prev = await api.get('/api/blogs')
  // Insert a new one
  const newBlog = {
    'title': 'This is an auto posted entry',
    'author': 'Autotester',
    'url': 'http://example.com/autotester',
    'likes': 11
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  // Get the current count
  const after = await api.get('/api/blogs')
  // Delete the new post
  await api.delete('/api/blogs/'+response.body.id)

  expect(after.body.length).toBe(prev.body.length+1)
})

test('empty likes amount', async () => {
  // Insert a new one
  const newBlog = {
    'title': 'This is an auto posted entry',
    'author': 'Autotester',
    'url': 'http://example.com/autotester'
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  // Delete the new post
  await api.delete('/api/blogs/'+response.body.id)
  expect(response.body.likes).toBe(0)
})

test('empty url and title', async () => {
  // Insert a new one
  const newBlog = {
    'author': 'Autotester',
    'likes': 24
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(400)
})

test('Update a post', async () => {
  // Insert a new one
  const newBlog = {
    'title': 'This is an auto posted entry',
    'author': 'Autotester',
    'url': 'http://example.com/autotester',
    'likes': 1
  }
  
  const newPostResponse = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  newBlog.likes = 2
  await api.put('/api/blogs/'+newPostResponse.body.id).send(newBlog).expect(200).expect('Content-Type', /application\/json/)
  const updatedPost = await api.get('/api/blogs/'+newPostResponse.body.id).expect(200).expect('Content-Type', /application\/json/)
  await api.delete('/api/blogs/'+newPostResponse.body.id)
  expect(updatedPost.body.likes).toBe(2)

})

afterAll(() => {
  mongoose.connection.close()
})