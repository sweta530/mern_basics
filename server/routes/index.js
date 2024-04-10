const express = require('express')
const product = require('./product.route')
const app = express()
const adminAuthentication = require('../middleware/admin.authentication')
const apiAuthentication = require('../middleware/api.authentication')
const user = require('./user.route')

// For admin
app.use('/admin/', user)
app.use('/admin/v1', adminAuthentication, product)


// For App
app.use('/api/v1', user)
app.use('/api/v1', apiAuthentication, product)


module.exports = app
