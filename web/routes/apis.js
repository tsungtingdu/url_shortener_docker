const express = require('express')
const router = express.Router()
const urlController = require('../controllers/api/urlController')

router.get('/', urlController.getIndex)
// router.get('/:key', urlController.getOriginalUrl)
router.post('/', urlController.postIndex)

module.exports = router