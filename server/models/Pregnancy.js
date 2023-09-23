const mongoose = require('mongoose');
const mealSchema = require('./Meals');

const pregnancySchema = new mongoose.Schema({
    childNumber: {
        type: Number,
        required: true
    },
    mealDiary: [mealSchema]
});

module.exports = pregnancySchema;