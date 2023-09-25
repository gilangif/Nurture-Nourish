const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { openAI } = rqr('../helpers/openAI');
class RecipeController
{
    static async addRecipe(req, res)
    {
        try
        {
            const user = req.user;
            const userProfile = await Profile.findById(user.profile);
            const { recipes } = req.body
            recipes.forEach(async x =>
            {
                const recipe = new Recipe(x)
                await recipe.save();
                userProfile.favoriteRecipes.push(recipe._id);
                await userProfile.save();
            })
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
            const userProfile = await Profile.findById(user.profile);
            const recipes = []
            for (let i = 0; i < userProfile.favoriteRecipes.length; i++)
            {
                const recipe = await Recipe.findById(userProfile.favoriteRecipes[i]);
                recipes.push(recipe)
            }
            res.status(200).json(recipes)
        } catch (error)
        {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async deleteRecipe(req, res)
    {
        try
        {
            const { id } = req.params;
            const user = req.user;
            const userProfile = await Profile.findById(user.profile);
            const index = userProfile.favoriteRecipes.indexOf(id);
            console.log(index)
            userProfile.favoriteRecipes.splice(index, 1);
            await userProfile.save();
            await Recipe.deleteOne({ _id: id });
            res.status(200).json({
                message: "Recipe deleted successfully"
            })
        } catch (error)
        {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async getRecommendationRecipe(req, res)
    {

    }
}

module.exports = RecipeController;