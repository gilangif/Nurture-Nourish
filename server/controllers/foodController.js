const User = require("../models/User")
const mongoose = require("mongoose")
const fs = require("fs")
const vision = require("@google-cloud/vision")
const Food = require("../models/Food")
const axios = require("axios")
const path = require("path")

const credentials = require("../application_default_credentials.json")
const client = new vision.ImageAnnotatorClient()

class FoodController {
  static async uploadIngredients(req, res) {
    try {
      console.log(req.file)
      const fileName = req.file.path
      const request = { image: { content: fs.readFileSync(fileName) } }
      const [result] = await client.objectLocalization(request)
      const objects = result.localizedObjectAnnotations
      const ingredients = []
      objects.forEach((object) => {
        console.log(`Name: ${object.name}`)
        if (object.name !== "Food" && object.name !== "Vegetable" && object.name !== "Fruit") {
          if (!ingredients.includes(object.name)) {
            ingredients.push(object.name)
          }
        }
        console.log(`Confidence: ${object.score}`)
        const vertices = object.boundingPoly.normalizedVertices
        vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`))
      })
      fs.unlink(req.file.path, (err) => {
        if (err) {
          throw err
        }
      })
      res.status(200).json({
        ingredients: ingredients,
        message: "OK",
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }
  static async getFoods(req, res) {
    const { category } = req.query
    try {
      const foods = await Food.find({})
      res.status(200).json(foods)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }

  static async test(req, res, next) {
    try {
      // const ingredients = JSON.parse(req.body["ingredients"]) || req.body.ingredients
      // console.log("📌 ingredients: ", ingredients)

      //   const query = `Given that someone is pregnant trimester 1
      //  and has the ingredients ${ingredients.join(", ")}, provide
      //  recommended Indonesian food recipes also nutrition in the following json format  below, give 3 data in one array

      //  [{"title": "", "description": "", "ingredients": [], "instructions":[], "nutrition": ""}]`

      // const search = await openAI(query)
      // const data = JSON.parse(search[0]?.message?.content)

      // const { data } = await axios.get("https://api.imagga.com/v2/tags", {
      //   auth: {
      //     username: "acc_f36589c84f50229",
      //     password: "45d0ef31a46a5667bdf20830833ef6a5",
      //   },
      //   params: {
      //     image_url: "https://api.cyborg1201.online/uploads/ingredients.png",
      //   },
      // })

      const data = [
        {
          title: "Ayam Goreng",
          description: "Fried chicken with pineapple and spinach",
          ingredients: ["ayam", "nanas", "bayam"],
          instructions: ["Marinate chicken with spices.", "Fry chicken until golden brown.", "Serve with sautéed pineapple and spinach."],
          nutrition: "High in protein and vitamins A, C, and K.",
        },
        {
          title: "Nasi Goreng",
          description: "Indonesian-style fried rice with chicken, pineapple, and spinach",
          ingredients: ["ayam", "nanas", "bayam"],
          instructions: [
            "Heat oil in a wok and sauté chicken until cooked.",
            "Add cooked rice and stir-fry with vegetables.",
            "Add pineapple chunks and spinach leaves. Mix well.",
            "Season with soy sauce and spices.",
            "Serve hot.",
          ],
          nutrition: "Balanced meal with carbohydrates, protein, and various vitamins.",
        },
        {
          title: "Sayur Bayam Tumis",
          description: "Sautéed spinach with chicken and pineapple",
          ingredients: ["ayam", "nanas", "bayam"],
          instructions: [
            "Heat oil and stir-fry chicken until cooked.",
            "Add spinach and pineapple chunks.",
            "Season with spices and soy sauce.",
            "Cover and cook until spinach wilts.",
            "Serve as a side dish with rice or noodles.",
          ],
          nutrition: "Rich in iron, fiber, and vitamins A and C.",
        },
      ]

      res.status(200).json(data)
    } catch (err) {
      console.log(err)
      res.status(err.status || 500).json({ message: err.message })
    }
  }
}

module.exports = FoodController
