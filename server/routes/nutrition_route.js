const express = require("express")
const router = express.Router()

const { NutritionController } = require("../controllers")

router.get("/nutritions", NutritionController.getNutrition)
router.get("/nutritions/:ProfileId", NutritionController.getNutritionByProfileId)
router.post("/nutritions/:ProfileId", NutritionController.addNutrition)

module.exports = router
