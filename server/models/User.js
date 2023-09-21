const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "test"
    },
    gender: {
        type: String,
        default: "test"
    },
    age: {
        type: Number,
        default: 1
    }
})

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
    profile: profileSchema
})

userSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(this.password, salt);
      this.password = hashedPassword;
  
      return next();
    } catch (error) {
      return next(error);
    }
  });

const User = new mongoose.model('User', userSchema)

module.exports = User;