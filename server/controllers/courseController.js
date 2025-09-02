const { fetchAllCourses, insertCourse, updateCourseById, deleteCourseById, fetchCourseById, fetchBulkCourseByIds } = require('../models/courseModel');


// get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await fetchAllCourses();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};


// to create a course
const createCourse = async (req, res) => {
    try {
        const { title, description, price, instructor, image_url, videos } = req.body;

        if (!title || !description || !price || !instructor || !image_url || !videos) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await insertCourse({ title, description, price, instructor, image_url, videos });
        res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
        console.log('error creating course', error);
        res.status(500).json({ error: 'Failed to create course' });
    }
};


// update/edit course 
const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, description, price, instructor, image_url, videos } = req.body;

        if (!title || !description || !price || !instructor || !image_url || !videos) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await updateCourseById(courseId, { title, description, price, instructor, image_url, videos });
        res.status(201).json({ message: 'Course updated successfully' });
    } catch (error) {
        console.log('error updating course:', error);
        res.status(500).json({ error: 'Failed to update course' });
    }
}


// delete course by id
const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        await deleteCourseById(courseId);
        res.status(201).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.log('error deleting course:', error);
        res.status(500).json({ error: 'Failed to delete course' });
    }
};

const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await fetchCourseById(courseId);
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Failed to fetch course' });
    }
}

const getBulkCoursesByIds = async (req, res) => {
    try {
        const courseIds = req.query.ids ? req.query.ids.split(",").map(Number) : [];
        if(courseIds.length === 0){
            return res.status(400).json({ message: "No course IDs provided" });
        }
        const courses = await fetchBulkCourseByIds(courseIds);
        res.json(Array.isArray(courses) ? courses : [courses]);
    } catch (error) {
        console.error('Error fetching courses by Ids:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
}

module.exports = { getAllCourses, createCourse, updateCourse, deleteCourse, getCourseById, getBulkCoursesByIds };