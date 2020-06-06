const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({
      where: { email: email }
    })
      .then(user => {
        console.log('in passport')
        console.log(user)
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
    console.log('In deserializeUser')
    User.findOne({
      where: { id: id }
    }).then(user => {
      console.log(user)
      done(null, user)
    }).catch(err => {
      done(err, null)
    })
  })

}