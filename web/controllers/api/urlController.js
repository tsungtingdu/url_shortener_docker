const urlService = require('../../services/urlService')

let urlController = {
  getIndex: (req, res) => {
    urlService.getIndex(req, res, data => {
      return res.status(data.status).json(data)
    })
  },
  postIndex: (req, res) => {
    urlService.postUrl(req, res, data => {
      return res.status(data.status).json(data)
    })
  }
}

module.exports = urlController