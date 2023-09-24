const nutrition = require("./nutrition_route")
const user = require("./user_route")

const express = require("express")
const router = express.Router()

router.use(user)
router.use(nutrition)

module.exports = router
