const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../../models')
const { User } = db

let userController = {
  signUp: async (req, res) => {
    try {
      if (req.body.password !== req.body.passwordCheck) {
        return res.status(400).json({
          status: 400,
          message: 'passwords inconsistent'
        })
      }
      let record = await User.findOne({
        where: { email: req.body.email }
      })
      if (record) {
        return res.status(400).json({
          status: 400,
          message: 'this email has been registered'
        })
      } else {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        let newUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          role: null
        })
        if (newUser) {
          return res.status(200).json({ status: 200, message: 'Sign up successfully!' })
        } else {
          return res.status(400).json({ status: 400, message: 'Something wrong, please try again' })
        }
      }
    }
    catch (err) {
      return res.status(400).json({
        status: 400,
        message: err
      })
    }

  },
  signIn: async (req, res) => {
    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
          status: 400,
          message: "name, email, and password are required"
        })
      }
      let email = req.body.email
      let password = req.body.password

      let user = await User.findOne({ where: { email: email } })
      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "user not found"
        })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
          status: 400,
          message: 'passwords did not match'
        })
      }
      let payload = { id: user.id }
      let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 30 })
      return res.status(200).json({
        status: 200,
        token: token,
        user: {
          id: user.id, name: user.name, email: user.email, role: user.role
        }
      })
    }
    catch (err) {
      return res.status(400).json({
        status: 400,
        message: err
      })
    }
  }
}

module.exports = userController