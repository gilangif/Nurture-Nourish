const mongoose = require("mongoose")

const dailyNutritionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    details: {}
});

module.exports = dailyNutritionSchema;