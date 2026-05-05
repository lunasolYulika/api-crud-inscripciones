const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth.controller')

router.post('/registro',controller.registro)
router.post('/login',controller.login)

module.exports = router