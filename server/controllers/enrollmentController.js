const { enrollCourse, checkEnrollment, fetchEnrolledCourses } = require('../models/enrollmentModel');
const Cart = require('../models/cartModel');
const axios = require('axios');

const sendEventToWorkflowService = async (user_id, course_id, course_title, total_amount) => {
    try {
        const customerName = req.user.name;  // assuming the user's name is in req.user.name
        const customerEmail = req.user.email;
        // payload for ORDER_PLACED
        const eventPayload = {
            eventType: "ORDER_PLACED",
            sourceSystem: "ECOMMERCE_V1",
            payload: {
                orderId: `enrollment-${user_id}-${course_id}`,
                status: "PLACED",
                totalAmount: total_amount,
                currency: "INR",
                customerName: customerName,
                customerEmail: customerEmail,
                createdAt: new Date().toISOString(),
                items: [{ name: course_title, quantity: 1, price: total_amount }]
            }
        };

        // Send the event to your workflow service (ensure correct API URL)
        const response = await axios.post('http://localhost:8080/api/events', eventPayload, {
            headers: { 'X-API-Key': 'your-api-key' } 
        });

        console.log("Event sent to Workflow Service:", response.data);
    } catch (error) {
        console.error("Error sending event to Workflow Service:", error.message);
    }
};

const enroll = async (req, res) => {
    try {
        const user_id = req.user.id;  // from JWT middleware
        const { courses } = req.body;

        if (!courses || courses.length === 0) {
            return res.status(400).json({ message: "No courses to enroll" });
        }

        for (let course_id of courses) {
            await enrollCourse(user_id, course_id);

            const courseDetails = await db.query(`SELECT title, price FROM courses WHERE id = ?`, [course_id]);
            const course_title = courseDetails[0].title;
            const total_amount = courseDetails[0].price;

            await Cart.removeFromCart(user_id, course_id);

            // Send event to the workflow service
            await sendEventToWorkflowService(user_id, course_id, course_title, total_amount);
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


module.exports = { enroll, check, getEnrolledCourses };