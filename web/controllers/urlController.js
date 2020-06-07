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
      let success_msg, warning_msg = null
      if (data.status === 200) {
        success_msg = data.message
      } else {
        warning_msg = data.message
      }

      return res.render('index', { data: data, link: link, success_msg: success_msg, warning_msg: warning_msg })
    })
  },
  getOriginalUrl: (req, res) => {
    urlService.getOriginalUrl(req, res, data => {
      if (data) {
        return res.redirect(`${data.data.originalUrl}`)
      } else {
        return res.redirect('/')
      }
    })
  }
}

module.exports = urlController