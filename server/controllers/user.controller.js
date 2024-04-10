const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const { successResponse, errorResponse, catchResponse, validationErrorResponse } = require('../utility')
const { logInValidation } = require('./validation/user.validation')
var jwt = require('jsonwebtoken');

exports.admin_login = async function (req, res) {
    console.log("admin login");
}