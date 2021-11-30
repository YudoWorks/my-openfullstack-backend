const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

test('notes are return as json', async() => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async() => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(2)
}, 100000)

test('the first note is about http method', async() => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is Easy')
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
