const User = require("../models/User")
const mongoose = require("mongoose")
const fs = require("fs")
const vision = require("@google-cloud/vision")
const Food = require("../models/Food")
const axios = require("axios")

const credentials = require("../application_default_credentials.json")
const client = new vision.ImageAnnotatorClient()

class FoodController {
  static async getFoods(req, res) {
    const { key } = req.query
    try {
      let params = {}

      if (key) params = { key }

      res.status(200).json(await Food.find(params))
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }
}

module.exports = FoodController
