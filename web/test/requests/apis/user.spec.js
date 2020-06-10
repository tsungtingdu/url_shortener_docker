const assert = require('assert')
const bcrypt = require('bcryptjs')
const chai = require('chai')
const fetch = require('node-fetch')
const HOST = process.env.HOST || 'http://localhost'
const INTERNAL_PORT = 3000
const db = require('../../../models')
const { Url, User } = db

describe('# user request', () => {
  const testUser = {
    name: 'test',
    email: 'test@example.com',
    password: 'test',
    role: null
  }
  context('# POST /api/users/signup', () => {
    it('get error when put in different password', async () => {
      await fetch(`${HOST}:${INTERNAL_PORT}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: testUser.name,
          email: testUser.email,
          password: testUser.password,
          passwordCheck: `${testUser.password}error`
        })
      }).then(res => {
        assert.equal(res.status, 400)
      })
    })
    it('get error when missing a field', async () => {
      await fetch(`${HOST}:${INTERNAL_PORT}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: testUser.name,
          password: testUser.password,
          passwordCheck: testUser.password
        })
      }).then(res => {
        assert.equal(res.status, 400)
      })
    })
    it('sign up successfully', async () => {
      await fetch(`${HOST}:${INTERNAL_PORT}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: testUser.name,
          email: testUser.email,
          password: testUser.password,
          passwordCheck: testUser.password
        })
      }).then(res => {
        assert.equal(res.status, 200)
      })
    })
  })
  context('# POST /api/users/signin', () => {
    it('get error when fill in wrong password', async () => {
      await fetch(`${HOST}:${INTERNAL_PORT}/api/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: `${testUser.password}+err`,
        })
      }).then(res => {
        assert.equal(res.status, 400)
      })
    })
    it('sign in successfully', async () => {
      await fetch(`${HOST}:${INTERNAL_PORT}/api/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        })
      }).then(res => {
        assert.equal(res.status, 200)
      })
    })
  })
  after(async () => {
    let user = await User.findOne({ where: { email: testUser.email } })
    if (user) await user.destroy()
  })
})