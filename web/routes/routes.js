const express = require('express')
const router = express.Router()
const passport = require('passport')
const urlController = require('../controllers/urlController')
const userController = require('../controllers/userController')

router.get('/', urlController.getIndex)
router.get('/:key', urlController.getOriginalUrl)
router.post('/', urlController.postIndex)

// user
router.get('/users/signup', userController.getSignupPage)
router.post('/users/signup', userController.signup)
router.get('/users/signin', userController.getSigninPage)
router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true,
}))
router.get('/users/logout', userController.logout)

module.exports = router