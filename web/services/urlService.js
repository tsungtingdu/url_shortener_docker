const db = require('../models')
const { Url } = db
const HOST = process.env.HOST

let urlService = {
  getIndex: (req, res, callback) => {
    return callback({
      status: 200,
      message: 'ok'
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
        return callback({
          status: 200,
          message: 'Get a previous short url successfully!',
          data: record.get()
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
        return callback({
          status: 200,
          message: 'create a new short url successfully',
          data: newUrl.get()
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
  }
}

module.exports = urlService