const mongoose = require('mongoose');
const validator = require('validator');
const mealSchema = require('./Meals');

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
    },
    mealDiary: [mealSchema]
})

module.exports = profileSchema;