const moment = require('moment')

module.exports = {
  dataFormat: function (a) {
    return moment(a).format('YYYY-MM-DD HH:mm:ss')
  }
}