const urlService = require('../services/urlService')

let urlController = {
  getIndex: (req, res) => {
    urlService.getIndex(req, res, data => {
      return res.render('index', data)
    })
  }
}

module.exports = urlController