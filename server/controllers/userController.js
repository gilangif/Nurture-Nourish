const User = require('../models/User');

class userController
{
    static async createUser(req, res, next)
    {
        const { username, email, password } = req.body;
        const newUser = new User({
            username: username,
            email: email,
            password: password
        })
        newUser.save()
            .then(() =>
            {
                console.log('User saved successfully');
                res.status(201).json({
                    user: newUser,
                    message: "User created successfully"
                })
            })
            .catch((error) =>
            {
                console.error('Error:', error.message);
                if (error.name === 'ValidationError')
                {
                    console.error('Validation errors:', error.errors);
                } else if (error.name === 'MongoError' && error.code === 11000)
                {
                    console.error('Duplicate key error:', error.message);
                } else
                {
                    console.error('Other error:', error.message);
                }
                res.status(500).json({
                    message: error.message
                })
            });
    }
}

module.exports = userController;