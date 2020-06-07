const db = require('../models')
const { Url } = db
const HOST = process.env.HOST

let urlService = {
  getIndex: async (req, res, callback) => {
    // get user data
    userData = await urlService.getUserData(req)
    return callback({
      status: 200,
      message: 'ok',
      userData: userData
    })
  },
  createShortUrl: async (req, res, callback) => {
    try {
      // find if the same original url exists
      let record = await Url.findOne({
        where: { originalUrl: req.body.url }
      })
      if (record) {
        // return exist shortUrl
        userData = await urlService.getUserData(req)
        return callback({
          status: 200,
          message: 'Get a previous short url successfully!',
          data: record.get(),
          userData: userData
        })
      } else {
        // create a new short url
        let code = Math.random().toString(36).slice(-5)
        let newUrl = await Url.create({
          originalUrl: req.body.url,
          shortUrl: `${HOST}/${code}`,
          view: 0,
          userId: req.user ? req.user.id : null
        })
        // get latest user data
        userData = await urlService.getUserData(req)
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
        where: { shortUrl: `${HOST}/${req.params.key}` }
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
  }
}

module.exports = urlService