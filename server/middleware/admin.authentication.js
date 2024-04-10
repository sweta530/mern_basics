const { unauthorizedErrorResponse } = require('../utility/index')
var jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    var token = req.headers.token
    if (!token) {
        return unauthorizedErrorResponse(res, {}, "Unauthorized", 401)
    }

    try {
        secret_key = process.env.ADMIN_JWT_SECRET
        jwt.verify(token, secret_key);
    } catch (err) {
        return unauthorizedErrorResponse(res, err, "Unauthorized", 401)
    }
    next()
}