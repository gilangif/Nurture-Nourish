const mongoose = require('mongoose');
const validator = require('validator');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "test"
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    }
})

module.exports = profileSchema;