const express = require('express')
const router = express.Router()
const ProfileController = require('../controllers/profileController');

router.get('/profiles', ProfileController.getProfile);


module.exports = router;