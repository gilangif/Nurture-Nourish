const mongoose = require("mongoose")

const dailyNutritionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    details: {}
});

const DailyNutrition = new mongoose.model("dailyNutrition", dailyNutritionSchema)

module.exports = DailyNutrition;