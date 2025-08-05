const express = require('express');
const router = express.Router();
const db = require('../config/db');
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAllCourses);

module.exports = router;