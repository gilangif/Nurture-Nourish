const Recipe = require("../models/Recipe")
const Profile = require("../models/Profile")

var ImageKit = require("imagekit")
const yt = require("@citoyasha/yt-search")
const { image_search } = require("duckduckgo-images-api")
const openAI = require("../helpers/OpenAI")

class RecipeController
{
  static async addRecipe(req, res)
  {
    try
    {
      const { recipes } = req.body
      if (!recipes) throw ({ message: "Recipes not found", status: 400 })
      const user = req.user
      const userProfile = await Profile.findById(user.profile)
      recipes.forEach(async (x) =>
      {
        const recipe = new Recipe(x)
        await recipe.save()
        userProfile.favoriteRecipes.push(recipe._id)
        await userProfile.save()
      })
      res.status(201).json({
        message: "Recipe added successfully",
      })
    } catch (error)
    {
      res.status(error.status).json({
        message: error.message,
      })
    }
  }
  static async getRecipes(req, res)
  {
    try
    {
      const user = req.user
      const userProfile = await Profile.findById(user.profile)
      const recipes = []
      for (let i = 0; i < userProfile.favoriteRecipes.length; i++)
      {
        const recipe = await Recipe.findById(userProfile.favoriteRecipes[i])
        recipes.push(recipe)
      }
      res.status(200).json(recipes)
    } catch (error)
    {
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }

  static async imageRecognise(req, res, next)
  {
    try
    {
      var imagekit = new ImageKit({
        publicKey: "public_lviJAdWFlozrKL+yzqkFSLUShsY=",
        privateKey: "private_c8HAKXDe/YQYuMoZKVaQ+FWfvDo=",
        urlEndpoint: "https://ik.imagekit.io/nfpxx9byw",
      })

      const data = await imagekit.upload({
        file: req.file.buffer,
        fileName: "ingredients.jpg",
        extensions: [{ name: "aws-auto-tagging", maxTags: 5, minConfidence: 95 }],
      })

      res.status(200).json(data)
    } catch (err)
    {
      console.log(err, "ini error recognition")

      res.status(err.status || 500).json({ message: err.message })
    }
  }

  static async getAIRecipes(req, res, next)
  {
    try
    {
      const { ingredients } = req.body

      const ingredient = ingredients.join(", ")
      const query = `Given that someone is pregnant trimester 1
       and has the ingredients ${ingredient}, provide
       recommended Indonesian food recipes also nutrition result on bahasa in the following json format below, give 3 data in one array

       [{"title": "", "description": "", "ingredients": [], "instructions":[], "nutrition": ""}]`

      const search = await openAI.query(query)
      const results = JSON.parse(search[0]?.message?.content)


      await Promise.all(
        results.map(async (x) =>
        {
          const thumb = await image_search({ query: x.title, moderate: true })
          const youtube = await yt.search(x.title, 1)
          x.inputIngredients = ingredients
          x.thumb = thumb[0].image
          x.youtube = youtube[0].link
          return x
        })
      )

      res.status(200).json(results)
    } catch (err)
    {
      // console.log(err, "INI ERROR GET AI RECIPE")
      res.status(err.status || 500).json({ message: err.message })
    }
  }
}

module.exports = RecipeController
