const mongoose = require('mongoose');
const validator = require('validator');

const mealSchema = new mongoose.Schema({
    mealTime: Date,
    nutrition: [{}]
})

module.exports = mealSchema