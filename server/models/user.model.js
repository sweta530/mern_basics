const mongoose = require('mongoose')
require('./connection');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Your email is required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Your name is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
});

userSchema.pre('save', async function (next) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Replace the plain text password with the hashed one
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


const User = mongoose.model('users', userSchema);

module.exports = User