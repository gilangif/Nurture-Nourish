const mongoose = require('mongoose');
const validator = require('validator');
const dailyNutritionSchema = require('./DailyNutrition');

const pregnancyDataSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        default: new Date()
    },
    childrenNumber: {
        type: Number,
        default: 1
    },
    dailyNutrition: [dailyNutritionSchema],
})

module.exports = pregnancyDataSchema;