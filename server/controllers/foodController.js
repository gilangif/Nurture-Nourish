const User = require('../models/User');
const mongoose = require('mongoose');
const OpenAi = require('openai');
const fs = require('fs');


class FoodController
{
    static async uploadIngredients(req, res)
    {
        console.log(req.file)
        await fs.unlinkAsync(req.file.path)
        res.status(200).json({
            message: "OK"
        })
    }
}

module.exports = FoodController