const User = require("../models/User")
const Profile = require("../models/Profile")

class ProfileController {
  static async getProfile(req, res, next) {
    try {
      const user = req.user
      const userProfile = await Profile.findById(user.profile)
      console.log(user)
      res.status(200).json(userProfile)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { name, gender, date } = req.body
      let user = req.user
      console.log(user, "DARI PROFILE CONTROLLERRR <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
      const userProfile = await Profile.findById(user.profile)
      if (name) {
        userProfile.name = name
      }
      if (gender) {
        userProfile.gender = gender
      }
      if (date) {
        userProfile.birthDate = date
      }
      user = await user.save()
      res.status(200).json({
        message: "Profile updated successfully"
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }
}

module.exports = ProfileController
