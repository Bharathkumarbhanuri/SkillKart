const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;