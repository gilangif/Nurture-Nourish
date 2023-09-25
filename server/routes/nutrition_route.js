const express = require("express")
const router = express.Router()

const { NutritionController } = require("../controllers/nutritionController")

router.get("abc", (req, res) => {
  res.send("asdkmaskd")
})

router.get("/nutritions", NutritionController.getNutrition)
router.post("/nutritions/", NutritionController.addNutrition)
router.get("/nutritions/:ProfileId", NutritionController.getNutritionByProfileId)

module.exports = router
