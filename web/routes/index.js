let routes = require('./routes')
let apis = require('./apis')

module.exports = (app) => {
  app.use('/api', apis)
  app.use('/', routes)
}