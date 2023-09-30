const mongoose = require('mongoose');
const validator = require('validator');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "test"
    },
    gender: {
        type: String,
        default: "test"
    },
    birthDate: {
        type: Date,
        default: new Date()
    },
    pregnancyData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pregnancy'
    }],
    favoriteRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
})

const Profile = new mongoose.model('profile', profileSchema);

module.exports = Profile;