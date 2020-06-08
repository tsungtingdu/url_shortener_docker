const crypto = require('crypto')
const db = require('../models')
const { Url } = db
const HOST = process.env.HOST

let urlService = {
  getIndex: async (req, res, callback) => {
    // get user data
    let userData = req.user ? await urlService.getUserData(req) : null
    return callback({
      status: 200,
      message: 'ok',
      userData: userData
    })
  },
  createShortUrl: async (req, res, callback) => {
    try {
      // validation
      let url = req.body.url.split(' ').join('')
      let isHost = url.includes(HOST)
      let userData = req.user ? await urlService.getUserData(req) : null

      if (isHost) {
        return callback({
          status: 200,
          message: 'Please do not enter the url from the same domain',
          data: null,
          userData: userData
        })
      }

      // find if the same original url exists
      let record = await Url.findOne({
        where: { originalUrl: req.body.url }
      })
      if (record) {
        // return exist shortUrl
        return callback({
          status: 200,
          message: 'Get a previous short url successfully!',
          data: record.get(),
          userData: userData
        })
      } else {
        // create a new short url
        let code = await urlService.encoder(req.body.url)
        let newUrl = await Url.create({
          originalUrl: req.body.url,
          shortUrl: code,
          view: 0,
          userId: req.user ? req.user.id : null
        })
        // get latest user data
        return callback({
          status: 200,
          message: 'create a new short url successfully',
          data: newUrl.get(),
          userData: userData
        })
      }
    }
    catch (err) {
      return callback({
        status: 400,
        message: err
      })
    }
  },
  getOriginalUrl: async (req, res, callback) => {
    try {
      let record = await Url.findOne({
        where: { shortUrl: req.params.key }
      })
      if (record) {
        await record.update({ view: record.view += 1 })
      }
      return callback({
        status: 200,
        message: 'retrieve data',
        data: record
      })
    }
    catch (err) {
      return callback({
        status: 400,
        message: err
      })
    }
  },
  getUserData: async (req) => {
    try {
      if (req.user) {
        return Url.findAll({
          raw: true,
          nest: true,
          where: { userId: req.user.id },
          order: [['createdAt', 'DESC']]
        })
      }
      return null
    }
    catch (err) {
      console.log(err)
    }
  },
  encoder: async (str) => {
    // use SHA-256 for creating hash with base64 encoding
    let hash = crypto.createHash('sha256').update(str).digest('base64')
    return hash.slice(0, 6)
  },
  postUrl: async (req, res, callback) => {
    try {
      let url = req.body.url.split(' ').join('')
      let userData = req.user ? await urlService.getUserData(req) : null

      let host = HOST
      if (host[host.length - 1] !== '/') { host = host + '/' }

      // if user put in the link with same domain
      let shortUrl = url
      if (shortUrl.includes(host)) {
        shortUrl = shortUrl.replace(host, '')
        let record = await Url.findOne({ where: { shortUrl: shortUrl } })

        if (record) {
          // if shortUrl record exist
          return callback({
            status: 200,
            message: 'Get a previous short url successfully!',
            data: record.get(),
            userData: userData
          })
        } else {
          //  show reminder
          return callback({
            status: 200,
            message: 'Please do not enter the url from the same domain',
            data: null,
            userData: userData
          })
        }
      }

      // if user NOT put in the link with same domain
      let longUrl = url
      let record = await Url.findOne({ where: { originalUrl: longUrl } })

      if (record) {
        // return exist shortUrl
        return callback({
          status: 200,
          message: 'Get a previous short url successfully!',
          data: record.get(),
          userData: userData
        })
      } else {
        // create a new shortUrl
        let code = await urlService.encoder(longUrl)
        let newUrl = await Url.create({
          originalUrl: req.body.url,
          shortUrl: code,
          view: 0,
          userId: req.user ? req.user.id : null
        })
        // get latest user data
        return callback({
          status: 200,
          message: 'create a new short url successfully',
          data: newUrl.get(),
          userData: userData
        })
      }
    }
    catch (err) {
      return callback({
        status: 400,
        message: err
      })
    }
  }
}

module.exports = urlService