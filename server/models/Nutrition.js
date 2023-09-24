const mongoose = require("mongoose")

const Nutrition = mongoose.model("nutrition", {
  date: { type: Date },
  details: { type: Object },
  ProfileId: { type: Number },
  totalAKG: { type: Number },
  totalNutrition: { type: Number },
  percentage: { type: Number },
})

module.exports = Nutrition
