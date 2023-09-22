const User = require('../models/User');
const mongoose = require('mongoose');
const OpenAi = require('openai');
const fs = require('fs');


class FoodController
{
    static async uploadIngredients(req, res)
    {
        try
        {
            console.log(req.file)
            fs.unlink(req.file.path, (err) => {
                if (err)
                {
                    throw err;
                }
            })
            res.status(200).json({
                message: "OK"
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

module.exports = FoodController