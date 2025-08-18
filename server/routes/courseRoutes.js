const express = require('express');
const router = express.Router();
const db = require('../config/db');
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAllCourses);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse)
router.delete('/:id', courseController.deleteCourse);
router.get('/:id', courseController.getCourseById);

module.exports = router;