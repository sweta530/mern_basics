const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

//user routes for admin
router.post('/admin_login', userController.admin_login)

//user routes for app
router.post('/login', userController.login)
router.post('/register', userController.register)


module.exports = router
