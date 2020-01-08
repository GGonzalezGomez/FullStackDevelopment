const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

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



afterAll(() => {
  mongoose.connection.close()
})