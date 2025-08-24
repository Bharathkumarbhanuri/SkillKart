const {insertToList,fetchList, removeFromList, moveFromListToCart} = require('../models/wishlistModel');
const addToList = async(req,res) => {
    try {
        const user_id = req.user.id; // from JWT middleware
        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({ message: "course Id is required" });
        }

        await insertToList(user_id, course_id); 
        res.json({ message: "Course added to wishlist" });
    } catch (err) {
        res.status(500).json({ message: "Error adding to wishlist", error: err.message });
    }
};

const getList = async(req,res) => {
    try {
        const user_id = req.user.id;
        const items = await fetchList(user_id);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: "Error fetching wishlist", error: err.message });
    }
};

const deleteFromList = async(req,res) => {
    try {
        const user_id = req.user.id;
        const { course_id } = req.body;

        await removeFromList(user_id, course_id);
        res.json({ message: "Removed from wishlist" });
    } catch (err) {
        res.status(500).json({ message: "Error removing from wishlist", error: err.message });
    }
};


const moveToCart = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({ message: "course Id is required" });
        }

        await moveFromListToCart(user_id, course_id);
        res.json({ message: "Course moved to cart" });
    } catch (err) {
        res.status(500).json({ message: "Error moving course to cart", error: err.message });
    }
};



module.exports = {addToList, getList, deleteFromList, moveToCart};