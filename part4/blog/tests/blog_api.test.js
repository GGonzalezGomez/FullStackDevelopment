const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs count is correct', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(4)
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

afterAll(() => {
  mongoose.connection.close()
})