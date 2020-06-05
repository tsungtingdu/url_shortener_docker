const express = require('express')
const router = express.Router()
const urlController = require('../controllers/urlController')

router.get('/', urlController.getIndex)
router.post('/', urlController.postIndex)

module.exports = router