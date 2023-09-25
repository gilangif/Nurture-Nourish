const User = require("../models/User")
const { Profile } = require('../models/Profile');
const bcrypt = require("bcryptjs")
const { generateToken } = require("../helpers/jwtHelper")

class UserController
{
  static async createUser(req, res, next)
  {
    const { username, email, password } = req.body
    const newProfile = new Profile({
      name: "test",
      gender: "test",
      birthDate: new Date(),
      pregnancyData: [],
      favoriteRecipes: []
    })
    let savedProfile = await newProfile.save()
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      profile: savedProfile._id,
    })
    newUser
      .save()
      .then(() =>
      {
        console.log(newUser)
        console.log("User saved successfully")
        res.status(201).json({
          message: "User created successfully",
        })
      })
      .catch((error) =>
      {
        console.error("Error:", error.message)
        console.log(error)
        if (error.name === "ValidationError")
        {
          console.error("Validation errors:", error.errors)
        } else if (error.name === "MongoError" && error.code === 11000)
        {
          console.error("Duplicate key error:", error.message)
        } else if (error.name === "MongoServerError")
        {
          console.error("Server error: ", error.message)
        } else
        {
          console.error("Other error:", error.message)
        }
        res.status(500).json({
          message: error.message,
        })
      })
  }

  static async loginUser(req, res)
  {
    try
    {
      const { username, email, password } = req.body
      let user = null

      if (email)
      {
        user = await User.findOne({ email: email })
      } else if (username)
      {
        user = await User.findOne({ username: username })
      }
      if (!user)
      {
        throw new Error("Invalid credentials, please try again")
      } else
      {
        bcrypt
          .compare(password, user.password)
          .then((match) =>
          {
            if (match)
            {
              const access_token = generateToken({ id: user["_id"] })
              res.status(200).json({
                access_token: access_token,
                message: "Successfully logged in",
              })
            } else
            {
              res.status(401).json({
                message: "Invalid credentials, please try again",
              })
            }
          })
          .catch((error) =>
          {
            console.log(error)
            res.status(500).json({
              message: "Internal server error",
            })
          })
      }
    } catch (error)
    {
      console.log(error)
      res.status(401).json({
        message: error.message,
      })
    }
  }
}

module.exports = { UserController }
