const mongoose = require('mongoose');
const { Recipe } = require('../models/Recipe');
const User = require('../models/User');
class RecipeController
{
    static async addRecipe(req, res)
    {
        try
        {
            const user = req.user;
            const { title, description, ingredients, instructions, nutrition } = req.body;
            const recipe = new Recipe({
                title,
                description,
                ingredients,
                instructions,
                nutrition
            })
            await recipe.save();
            user.profile.favoriteRecipes.push(recipe._id);
            await user.save();
            res.status(201).json({
                message: "Recipe added successfully"
            })
        } catch (error)
        {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async getRecipes(req, res)
    {
        try
        {
            const user = req.user;
            const newuser1 = await User.findById('65111f0e1c9b2d4d93ec75a3').populate('favoriteRecipes').exec();
            res.status(200).json({
                message: "OK",
                data: newuser1
            })
        } catch (error)
        {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = RecipeController;