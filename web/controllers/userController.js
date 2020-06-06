const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

let userController = {
  getSignupPage: (req, res) => {
    return res.render('signup')
  },
  signup: async (req, res) => {
    try {
      if (req.body.passwordCheck !== req.body.password) {
        req.flash('warning_msg', "Passwords are not the same!")
        return res.redirect('/users/signup')
      } else {
        let user = await User.findOne({
          where: { email: req.body.email }
        })

        if (user) {
          req.flash('warning_msg', "This email has been registered!")
          return res.redirect('/users/signup')
        } else {
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(req.body.password, salt)
          await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: null
          }).then(user => {
            console.log(user)
          })
          return res.redirect('/users/signin')
        }
      }
    } catch (err) {
      console.log(err)
      return res.redirect('/users/signup')
    }
  },
  getSigninPage: (req, res) => {
    return res.render('signin')
  },
  logout: (req, res) => {
    req.flash('success_msg', "Log out successfully!")
    req.logout()
    res.redirect('/')
  }
}

module.exports = userController