const express = require('express')
const router = express.Router()
const urlController = require('../controllers/api/urlController')
const userController = require('../controllers/api/userController')

const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })

router.post('/users/signup', userController.signUp)
router.post('/users/signin', userController.signIn)

router.get('/', authenticated, urlController.getIndex)
router.post('/', authenticated, urlController.postIndex)

module.exports = router