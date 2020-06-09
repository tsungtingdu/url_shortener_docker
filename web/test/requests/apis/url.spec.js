const assert = require('assert')
const bcrypt = require('bcryptjs')
const chai = require('chai')
const fetch = require('node-fetch')
const HOST = process.env.HOST || 'http://localhost:3000'
const db = require('../../../models')
const { Url, User } = db

describe('# url request', () => {
  context('# Before sign in', () => {
    describe('go the index page', () => {
      it('can NOT get index', (done) => {
        fetch(`${HOST}/api`)
          .then(res => {
            // should be unauthorized, HTTP code 401
            assert.equal(res.status, 401)
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
      it('can NOT post the url from HOST domain', (done) => {
        fetch(`${HOST}/api`, {
          method: 'POST',
          body: 'url=https://www.npmjs.com/package/node-fetch'
        })
          .then(res => {
            // should be unauthorized, HTTP code 401
            assert.equal(res.status, 401)
            done()
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
  })
  context('# After sign in', () => {
    let result = ''                     // for saving short url result
    let testUrl = 'http://test.com'     // for creating short url
    let token = ''                      // for saving sign in token
    const testUser = {
      name: 'test',
      email: 'test@example.com',
      password: 'test',
      role: null
    }
    before(async () => {
      // create a test user
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(testUser.password, salt)
      await User.create({
        name: testUser.name,
        email: testUser.email,
        password: hash,
        role: null
      })
      // sign in as test user   
      await fetch(`${HOST}/api/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      })
        .then(res => res.json())
        .then(res => {
          token = res.token
        })
    })

    it('can create new short url', async () => {
      await fetch(`${HOST}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ url: testUrl })
      })
        .then(res => {
          assert.equal(res.status, 200)
          return res.json()
        }).then(res => {
          // save result for next test
          result = res.data.shortUrl
        })
    })

    it('can retrieve original short url', async () => {
      await fetch(`${HOST}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ url: `${HOST}/${result}` })
      })
        .then(res => res.json())
        .then(res => {
          assert.equal(res.data.originalUrl, testUrl)
        })
    })

    it('can NOT create short url of HOST domain', async () => {
      await fetch(`${HOST}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ url: `${HOST}/test` })
      })
        .then(res => assert.equal(res.status, 400))
    })

    after(async () => {
      // remove the test user and url
      let user = await User.findOne({ where: { email: testUser.email } })
      let url = await Url.findOne({ where: { originalUrl: testUrl } })
      if (user) await user.destroy()
      if (url) await url.destroy()
    })
  })
})