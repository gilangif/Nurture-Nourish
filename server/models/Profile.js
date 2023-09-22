const mongoose = require('mongoose');
const validator = require('validator');
const mealSchema = require('./Meals');

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
        default: "test"
    },
    mealDiary: [mealSchema]
})

module.exports = profileSchema;