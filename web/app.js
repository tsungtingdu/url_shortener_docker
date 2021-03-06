// required packages
const express = require('express')
const app = express()
const cors = require('cors')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const path = require('path')
// const passport = require('./config/passport')
const session = require('express-session')
const statusMonitor = require('express-status-monitor')
const swaggerDoc = require('./swagger/swaggerDoc')

// app config
const PORT = process.env.PORT || 3000

// use cors
app.use(cors())

// use handlebars
app.use('/', express.static(path.join(__dirname, 'public')))
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require('./config/handlebars-helpers.js')
}))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))

app.use(session({
  secret: 'akpitd',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// use passport
const passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use(statusMonitor())

// api doc
swaggerDoc(app)

// locals
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

routes(app)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})