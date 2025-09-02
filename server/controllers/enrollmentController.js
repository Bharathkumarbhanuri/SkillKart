const { enrollCourse, checkEnrollment, fetchEnrolledCourses } = require('../models/enrollmentModel');
const Cart = require('../models/cartModel');

const enroll = async (req, res) => {
    try {
        const user_id = req.user.id;  // from JWT middleware
        const { courses } = req.body;

        if (!courses || courses.length === 0) {
            return res.status(400).json({ message: "No courses to enroll" });
        }

        for (let course_id of courses) {
            await enrollCourse(user_id, course_id);
            await Cart.removeFromCart(user_id, course_id);
        }
        res.json({ message: "Courses enrolled successfully", courses });
    } catch (err) {
        res.status(500).json({ message: "Error enrolling to course", error: err.message });
    }
};

const check = async (req, res) => {
    try {
        const user_id = req.user.id;  // from JWT middleware
        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({ message: "course Id is required" });
        }
        const enrolled = await checkEnrollment(user_id, course_id);
        return res.json({ enrolled });
    } catch (err) {
        res.status(500).json({ message: "Error enrolling to course", error: err.message });
    }
}

const getEnrolledCourses = async (req, res) => {
    try {
        const user_id = req.user.id;  // from JWT middleware
        const enrolled = await fetchEnrolledCourses(user_id);
        return res.json(enrolled);
    } catch (err) {
        res.status(500).json({ message: "Error fetching enrolled courses", error: err.message });
    }
}


module.exports = { enroll, check, getEnrolledCourses};