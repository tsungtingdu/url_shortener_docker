const urlService = require('../../services/urlService')

let urlController = {
  getIndex: (req, res) => {
    urlService.getIndex(req, res, data => {
      return res.json(data)
    })
  },
  postIndex: (req, res) => {
    urlService.postUrl(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = urlController