const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: function (value) 
            {
                return value.length >= 5;
            },
            message: 'Password must be at least 5 characters long'
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value)
            {
                return validator.isEmail(value)
            },
            message: 'Invalid email format!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        validate: {
            validator: function (value) 
            {
                return value.length >= 5;
            },
            message: 'Password must be at least 5 characters long'
        },
    },
})

const User = new mongoose.model('User', userSchema)

module.exports = User;