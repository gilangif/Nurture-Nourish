const Pregnancy = require('../models/Pregnancy');
const User = require('../models/User');
class PregnancyController 
{
    static async addPregnancy(req, res, next)
    {
        try
        {
            const user = req.user;
            const { startDate } = req.body;
            if (!startDate)
            {
                throw { name: "BadRequest", message: "Invalid pregnancy data" }
            }
            user.profile.pregnancyData.push({
                startDate: startDate,
                childrenNumber: user.profile.pregnancyData.length || 12,
                dailyNutrition: []
            });
            await user.save();
            res.status(200).json({
                message: "Pregnancy data added successfully"
            });
        } catch (error)
        {
            console.log(error)
            res.status(400).json({
                message: error.message
            })
        }
    }

    static async getPregnancy(req, res, next)
    {
        try
        {
            const user = req.user;
            const pregnancyData = user.profile.pregnancyData;
            res.status(200).json({
                pregnancyData: pregnancyData
            })
        } catch (error)
        {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = PregnancyController;