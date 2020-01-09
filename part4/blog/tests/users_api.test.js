const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

test('users are returned as json', async () => {
  await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('new posts are correct', async () => {
  // Get current post count
  const prev = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
  // Insert a new one
  const newUser = {
    'name': 'Test User',
    'username': 'testuser',
    'password': 'password'
  }
  const response = await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
  // Get the current count
  const after = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
  // Delete the new post
  await api.delete('/api/users/'+response.body.id)
  
  expect(after.body.length).toBe(prev.body.length+1)
})

test('Username validation is correct', async () => {
  const newUser = {
    'name': 'Test User',
    'username': 't',
    'password': 'password'
  }
  const response = await api.post('/api/users').send(newUser).expect(400)
  expect(response.body.error).toBe('User validation failed: username: Path `username` (`t`) is shorter than the minimum allowed length (3).')
})

test('Password Validation is correct', async () => {
  const newUser = {
    'name': 'Test User',
    'username': 'testuser',
    'password': 'pa'
  }
  const response = await api.post('/api/users').send(newUser).expect(400)
  expect(response.body.error).toBe('Password is shorter than the minimum allowed length (3).')
})

afterAll(() => {
  mongoose.connection.close()
})