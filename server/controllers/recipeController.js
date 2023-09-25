const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Profile = require('../models/Profile');
class RecipeController
{
    static async addRecipe(req, res)
    {
        try
        {
            const user = req.user;
            const userProfile = await Profile.findById(user.profile);
            const { recipes } = req.body
            recipes.forEach(async x => {
                const recipe = new Recipe(x)
                await recipe.save();
                userProfile.favoriteRecipes.push(recipe._id)
            })
            await userProfile.save();
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
            // const newuser1 = await User.findById('65111f0e1c9b2d4d93ec75a3').populate('favoriteRecipes').exec();
            res.status(200).json(recipes)
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