const { fetchAllCourses } = require('../models/courseModel');

// get all courses
const getAllCourses = async(req, res) => {
    try{
        const courses = await fetchAllCourses();
        res.json(courses);
    }catch(error){
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

module.exports = {getAllCourses};