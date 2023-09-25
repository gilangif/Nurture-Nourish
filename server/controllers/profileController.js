const User = require('../models/User');
const { Profile } = require('../models/Profile');

class ProfileController
{
    static async getProfile(req, res, next)
    {
        try
        {
            const user = req.user;
            console.log(user);
            res.status(200).json(user.profile);
        }
        catch (err)
        {
            console.log(err)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    static async updateProfile(req, res, next)
    {
        try
        {
            const { name, gender, date } = req.body;
            let user = req.user;
            if (name)
            {
                user.profile.name = name;
            }
            if (gender)
            {
                user.profile.gender = gender;
            }
            if (date)
            {
                user.profile.birthDate = date;
            }
            user = await user.save();
            res.status(200).json(user);
        } catch (error)
        {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = ProfileController;