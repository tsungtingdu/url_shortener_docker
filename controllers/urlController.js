const urlService = require('../services/urlService')

let urlController = {
  getIndex: (req, res) => {
    urlService.getIndex(req, res, data => {
      return res.render('index', data)
    })
  },
  postIndex: (req, res) => {
    urlService.createShortUrl(req, res, data => {
      let link = data.data
      console.log(link)
      return res.render('index', { data: data, link: link })
    })
  },
  getOriginalUrl: (req, res) => {
    urlService.getOriginalUrl(req, res, data => {
      return res.render('index', { data: data })
    })
  }
}

module.exports = urlController