// required packages
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes/index')

// app config
const PORT = process.env.PORT || 3000

// use handlebars
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))

routes(app)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})