const { openAI } = require("../helpers/OpenAI")
const Nutrition = require("../models/Nutrition")

class NutritionController {
  static async getNutrition(req, res, next) {
    try {
      const data = await Nutrition.find()
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async getNutritionByProfileId(req, res, next) {
    try {
      const { ProfileId } = req.params
      const data = await Nutrition.find({ ProfileId })

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async addNutrition(req, res, next) {
    try {
      const { date, input } = req.body
      const { ProfileId } = req.params

      if (!date || input || input.length === 0) throw { message: "Invalid data format", status: 400 }

      const AKG = {
        Energi_kkal: { value: 1900 },
        Protein_g: { value: 60 },
        Lemak_Total: { value: 70 },
        Omega_3: { value: 0.6 },
        Omega_6: { value: 7 },
        Karbohidrat_g: { value: 250 },
        Serat_g: { value: 25 },
        Air_ml: { value: 2700 },
        Vitamin_A_re: { value: 800 },
        Vitamin_C_mcg: { value: 85 },
        Folat: { value: 600 },
        Kolin: { value: 450 },
        Vitamin_B5: { value: 6 },
        Vitamin_B3: { value: 18 },
        Vitamin_B6: { value: 2.6 },
        Vitamin_B1: { value: 1.4 },
      }

      // asumsi sample input
      // {
      //   "date": "12/01/1999",
      //   "input": [
      //     {
      //       "name": "nasi",
      //       "weight": 200
      //     },
      //     {
      //       "name": "ayam",
      //       "weight": 100
      //     }
      //   ]
      // }

      const inputToStr = input.map((x) => x.name + " " + x.weight + "gr").join(", ")
      const query = `give information about ${inputToStr} bayam for women trimester 1 with output only for this json format, dont set gram unit on result 
      { 
        Energi_kkal: { value : number, information : string},
        Protein_g: { value : number, information : string },
        Lemak_Total: { value : number, information : string},
        Omega_3: { value : number, information : string },
        Omega_6: { value : number, information : string},
        Karbohidrat_g": { value : number, information : string },
        Serat_g: { value : number, information : string },
        Air_ml: { value : number, information : string },
        Vitamin_A_re: { value : number, information : string },
        Vitamin_C_mcg: { value : number, information : string },
        Folat: { value : number, information : string },
        Kolin: { value : number, information : string },
        Vitamin_B5: { value : number, information : string },
        Vitamin_B3: { value : number, information : string },
        Vitamin_B6: { value : number, information : string },
        Vitamin_B1: { value : number, information : string },
        conclusion : string
      }`

      const openai = await openAI(query)
      const details = JSON.parse(openai[0]?.message?.content)

      if (openai.length === 0 || openai[0].message.content) throw { message: "Failed to get OpenAI expect result", status: 400 }

      let totalAKG = 0
      let totalNutrition = 0

      for (let x in AKG) {
        totalAKG += AKG[x].value
        totalNutrition += details[x].value
      }

      const add = new Nutrition({
        date,
        details,
        ProfileId,
        totalAKG: Math.ceil(totalAKG),
        totalNutrition: Math.ceil(totalNutrition),
        percentage: Math.ceil((totalNutrition / totalAKG) * 100),
      })

      res.status(200).json(await add.save())
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}

module.exports = { NutritionController }
