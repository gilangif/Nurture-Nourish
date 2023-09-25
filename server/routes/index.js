const nutrition = require("./nutrition_route")
const user = require("./user_route")
const profile = require("./profile")
const authentication = require("../middleware/authentication")
const pregnancy = require("./pregnancy")
const express = require("express")
const router = express.Router()

router.use(user)
router.use(authentication)
router.use(nutrition)
router.use(profile)
router.use(pregnancy)

module.exports = router
