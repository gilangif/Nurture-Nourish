const mongoose = require("mongoose")
const { dailyNutritionSchema } = require("./DailyNutrition")

const pregnancyDataSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    default: new Date(),
  },
  childrenNumber: {
    type: Number,
    default: 1,
  },
  dailyNutrition: [dailyNutritionSchema],
  // dailyNutrition: Array
})

const Pregnancy = new mongoose.model("Pregnancy", pregnancyDataSchema)

module.exports = { pregnancyDataSchema, Pregnancy }
