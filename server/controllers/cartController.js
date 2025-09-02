const { insertToCart, fetchCart, removeFromCart, moveFromCartToList } = require('../models/cartModel');
const { check } = require('../models/enrollmentModel');

const addToCart = async (req, res) => {
    try {
        const user_id = req.user.id;  // from JWT middleware
        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({ message: "course Id is required" });
        }

         // 1️⃣ Check if user already enrolled
        const alreadyEnrolled = await checkEnrollment(user_id, course_id);
        if (alreadyEnrolled) {
            return res.status(400).json({ message: "You are already enrolled in this course" });
        }
        
        // 2️⃣ Insert into cart
        await insertToCart(user_id, course_id);
        res.json({ message: "Course added to cart successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        const user_id = req.user.id;
        const items = await fetchCart(user_id);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
};

const deleteFromCart = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { course_id } = req.body;
        await removeFromCart(user_id, course_id);
        res.json({ message: "Removed from cart" });
    } catch (err) {
        res.status(500).json({ message: "Error removing from cart", error: err.message });
    }
};

const movetowishlist = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({ message: "course Id is required" });
        }

        await moveFromCartToList(user_id, course_id);
        res.json({ message: "Moved course from cart to wishlist successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error removing from cart", error: err.message });
    }
};







module.exports = { addToCart, getCart, deleteFromCart, movetowishlist};