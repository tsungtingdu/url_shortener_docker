const db = require('../models')
const { Url } = db

let urlService = {
  getIndex: (req, res, callback) => {
    return callback({
      status: 200,
      message: 'ok'
    })
  }
}

module.exports = urlService