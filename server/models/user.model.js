const mongoose = require('mongoose')
require('./connection');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "Your email address is required"],
        enum: ['admin', 'user']
    },
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    mobile: {
        type: String,
        required: [true, "Your phone number is required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('users', userSchema);

module.exports = User