const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')

//category routes for admin
router.post('/product', productController.add)
router.put('/product/:id', productController.update)
router.delete('/product/:id', productController.delete)
router.get('/product/:id', productController.get)
router.get('/product', productController.getall)


//category routes for app
router.get('/product', productController.getall)

module.exports = router
