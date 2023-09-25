const mongoose = require("mongoose")

const dailyNutritionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    details: {}
});

const dailyNutrition = new mongoose.model("dailyNutrition", dailyNutritionSchema)

module.exports = { dailyNutrition, dailyNutritionSchema };