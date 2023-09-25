const mongoose = require("mongoose")

const dailyNutritionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    details: {},
    totalAkg: String
});

const DailyNutrition = mongoose.model("DailyNutrition", dailyNutritionSchema)

module.exports = {dailyNutritionSchema, DailyNutrition};