const express = require('express');
const router = express.Router();
const db = require('../config/db');
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/getenrolled', authMiddleware, enrollmentController.enroll);
router.post('/check', authMiddleware, enrollmentController.check);
router.get('/enrolledcourses', authMiddleware, enrollmentController.getEnrolledCourses);



module.exports = router; 