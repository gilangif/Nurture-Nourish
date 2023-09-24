const mongoose = require('mongoose');
const validator = require('validator');

const mealSchema = new mongoose.Schema({
    nutrition: {}
})

module.exports = mealSchema