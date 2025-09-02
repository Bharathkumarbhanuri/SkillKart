const { searchCourses, searchCart, searchWishlist, searchMyCourses } = require("../models/searchModel");


const search = async (req, res) => {
    try {
        const { context, q } = req.query;
        const user_id = req.user ? req.user.id : null; // from JWT middleware

        if (!q) {
            return res.status(400).json({ message: "Query (q) is required" });
        }

        if (["cart", "wishlist", "mycourses"].includes(context) && !user_id) {
            return res.status(401).json({ message: "Authentication required" });
        }

        let results = [];

        switch (context) {
            case "courses":
            case "home":
                results = await searchCourses(q);
                break;

            case "cart":
                if (!user_id) return res.status(401).json({ message: "Unauthorized" });
                results = await searchCart(user_id, q);
                break;

            case "wishlist":
                if (!user_id) return res.status(401).json({ message: "Unauthorized" });
                results = await searchWishlist(user_id, q);
                break;

            case "mycourses":
                if (!user_id) return res.status(401).json({ message: "Unauthorized" });
                results = await searchMyCourses(user_id, q);
                break;

            default:
                return res.status(400).json({ message: "Invalid search context" });
        }

        res.json({ results });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { search };
