const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { successResponse, errorResponse, catchResponse, validationErrorResponse } = require('../utility')
const { loginValidation } = require('./validation/user.validation')
var jwt = require('jsonwebtoken');

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Validate login inputs
        const { error, isValid } = loginValidation({ email, password });
        if (!isValid) {
            return validationErrorResponse(res, error, 'Invalid login data', 400);
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user || user.role !== 'user') {
            return unauthorizedErrorResponse(res, null, 'Unauthorized', 401);
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return unauthorizedErrorResponse(res, null, 'Invalid credentials', 401);
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.APP_JWT_SECRET);
        successResponse(res, { token }, 'Login successful', 200);
    } catch (error) {
        catchResponse(res, error, 'Server error', 500);
    }
}

exports.admin_login = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Validate login inputs
        const { error, isValid } = loginValidation({ email, password });
        if (!isValid) {
            return validationErrorResponse(res, error, 'Invalid login data', 400);
        }

        // Find admin by email
        const admin = await User.findOne({ email });
        if (!admin || admin.role !== 'admin') {
            return unauthorizedErrorResponse(res, null, 'Unauthorized', 401);
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return unauthorizedErrorResponse(res, null, 'Invalid credentials', 401);
        }

        // Generate JWT token
        const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.ADMIN_JWT_SECRET);
        successResponse(res, { token }, 'Admin login successful', 200);
    } catch (error) {
        catchResponse(res, error, 'Server error', 500);
    }
}

exports.register = async function (req, res) {
    try {
        const { email, password, name, phone } = req.body;

        // Validate registration inputs
        const { error, isValid } = loginValidation({ email, password });
        if (!isValid) {
            return validationErrorResponse(res, error, 'Invalid registration data', 400);
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return validationErrorResponse(res, null, 'User already exists', 400);
        }

        // Create new user
        const newUser = new User({ email, password, name, phone });

        // Save new user to the database
        let resData = await newUser.save();

        // Send success response
        successResponse(res, resData, 'User registered successfully', 201);
    } catch (error) {
        // Catch and handle any errors
        catchResponse(res, error, 'Server error', 500);
    }
}

