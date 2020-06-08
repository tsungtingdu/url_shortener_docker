const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')

// module.exports = app => {
//   app.use(passport.initialize())
//   app.use(passport.session())

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({
    where: { email: email }
  })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered!' })
      }
      return bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return done(null, false, { message: 'Email or Password incorrect!' })
        }
        return done(null, user)
      })
      return done(null, user)
    })
    .catch(err => done(err, false))
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findOne({
    where: { id: id }
  }).then(user => {
    done(null, user)
  }).catch(err => {
    done(err, null)
  })
})

// JWT
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.findOne({ where: { id: jwt_payload.id } }).then(user => {
    if (!user) return next(null, false)
    return next(null, user)
  })
})
passport.use(strategy)
// }
module.exports = passport