const nutrition = require("./nutrition_route")
const user = require("./user_route")
const profile = require("./profile")
const authentication = require('../middleware/authentication');
const pregnancy = require("./pregnancy")
const express = require("express")
const router = express.Router()
const food = require("./foods")
const recipe = require("./recipes")
const userMeal = require("./userMeals")

router.use(user)
// router.use(authentication)
router.use(nutrition)
router.use(profile)
router.use(food)
router.use(recipe)
router.use(pregnancy)
router.use(userMeal)

module.exports = router
