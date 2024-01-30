import { hash } from 'bcrypt'
import { type Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async() => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    jest.useRealTimers()
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async() => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Kayke',
          email: 'Kayke@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async() => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Kayke',
        email: 'Kayke@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'Kayke@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
