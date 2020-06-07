const urlService = require('../services/urlService')

let urlController = {
  getIndex: (req, res) => {
    urlService.getIndex(req, res, data => {
      let userData = data.userData
      return res.render('index', { userData: userData })
    })
  },
  postIndex: (req, res) => {
    urlService.createShortUrl(req, res, data => {
      let link = data.data
      let userData = data.userData
      let success_msg, warning_msg = null
      if (data.status === 200) {
        success_msg = data.message
      } else {
        warning_msg = data.message
      }

      return res.render('index', { userData: userData, link: link, success_msg: success_msg, warning_msg: warning_msg })
    })
  },
  getOriginalUrl: (req, res) => {
    urlService.getOriginalUrl(req, res, data => {
      if (data && data.data) {
        return res.redirect(`${data.data.originalUrl}`)
      } else {
        return res.redirect('/')
      }
    })
  }
}

module.exports = urlController