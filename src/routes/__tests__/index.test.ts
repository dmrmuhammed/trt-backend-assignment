import 'dotenv/config'
import app from '../../server'
import request from 'supertest'
import mongoose, { ObjectId } from 'mongoose'

// Test credentials
const testEmail: string = process.env.TEST_EMAIL || 'test@mail.com'
const testPassword: string = process.env.TEST_PASSWORD || 'password'
let token: string = ''

// Test tasks
let anyTaskId: string = ''
const testTasks = [
 {
  title: 'Task 1',
  description: 'Description 1',
  completed: false,
 },
 {
  title: 'Task 2',
  description: 'Description 2',
  completed: true,
 },
 {
  title: 'Task 3',
  description: 'Description 3',
  completed: false,
 },
 {
  title: 'Task 4',
  description: 'Description 4',
  completed: true,
 },
 {
  title: 'Task 5',
  description: 'Description 5',
  completed: false,
 },
 {
  title: 'Task 6',
  description: 'Description 6',
  completed: true,
 },
 {
  title: 'Task 7',
  description: 'Description 7',
  completed: false,
 },
 {
  title: 'Task 8',
  description: 'Description 8',
  completed: true,
 },
 {
  title: 'Task 9',
  description: 'Description 9',
  completed: false,
 },
 {
  title: 'Task 10',
  description: 'Description 10',
  completed: false,
 },
]

// Test setup
beforeAll(async () => {
 // Drop tables
 await mongoose.connection.collections.users.drop()
 await mongoose.connection.collections.tasks.drop()
 console.log('Database dropped')

 // Create new user
 await request(app).post('/auth/register').send({
  email: testEmail,
  password: testPassword,
 })

 // Get authentication token
 const response = await request(app).post('/auth/login').send({
  email: testEmail,
  password: testPassword,
 })
 token = response.body.authentication.token
})

// Register test
describe('POST /auth/register', () => {
 it('should return 201 Created', async () => {
  const response = await request(app).post('/auth/register').send({
   email: 'another@mail.com',
   password: testPassword,
  })
  expect(response.status).toBe(201)
 })
})

// Login test
describe('POST /auth/login', () => {
 it('should return 200 OK', async () => {
  const response = await request(app).post('/auth/login').send({
   email: 'another@mail.com',
   password: testPassword,
  })
  expect(response.status).toBe(200)
  expect(response.body.authentication).toHaveProperty('token')
 })
})

// Create task test
describe('POST /tasks', () => {
 testTasks.forEach((task, index) => {
  it(`should return 201 Created for task ${index + 1}`, async () => {
   const response = await request(app)
    .post('/tasks')
    .send({ ...task })
    .set('Cookie', [`trt-backend-auth=${token}`])
   expect(response.status).toBe(201)
   expect(response.body).toHaveProperty('_id')
   if (index === 0) anyTaskId = response.body._id
  })
 })
})

// Get task by id test
describe('GET /tasks/:id', () => {
 it('should return 200 OK', async () => {
  const response = await request(app)
   .get(`/tasks/${anyTaskId}`)
   .set('Cookie', [`trt-backend-auth=${token}`])
  expect(response.status).toBe(200)
 })
})

// Get all tasks with pagination and sorting test
describe('POST /tasks/all', () => {
 it('should return 200 OK', async () => {
  const response = await request(app)
   .post('/tasks/all')
   .send({
    page: 1,
    limit: 3,
    sortField: 'completed',
    sortOrder: -1,
   })
   .set('Cookie', [`trt-backend-auth=${token}`])
  expect(response.status).toBe(200)
 })
})

// Update task test
describe('PUT /tasks/:id', () => {
 it('should return 200 OK', async () => {
  const response = await request(app)
   .put(`/tasks/${anyTaskId}`)
   .send({ completed: true })
   .set('Cookie', [`trt-backend-auth=${token}`])
  expect(response.status).toBe(200)
 })
})

// Delete task test
describe('DELETE /tasks/:id', () => {
 it('should return 204 No Content', async () => {
  const response = await request(app)
   .delete(`/tasks/${anyTaskId}`)
   .set('Cookie', [`trt-backend-auth=${token}`])
  expect(response.status).toBe(204)
 })
})
