const mongoose = require('mongoose');
const validator = require('validator');
const mealSchema = require('./Meals');
const pregnancySchema = require('./Pregnancy');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "test"
    },
    gender: {
        type: String,
        default: "test"
    },
    birthDate: {
        type: Date,
        default: new Date()
    },
    pregnancyData: [pregnancySchema]
})

module.exports = profileSchema;