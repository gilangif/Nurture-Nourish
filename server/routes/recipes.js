const mongoose = require("mongoose")
const express = require("express")
const router = express.Router() 
const RecipeController = require("../controllers/recipeController")

router.post("/recipes", RecipeController.addRecipe);
router.get("/recipes", RecipeController.getRecipes);
router.delete("/recipes/:id", RecipeController.deleteRecipes);

module.exports = router