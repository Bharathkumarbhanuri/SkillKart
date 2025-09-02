const db = require("../config/db");

const searchCourses = async (q) => {
    const query = `SELECT id, title, price, image_url 
                   FROM courses 
                   WHERE title LIKE ?`;
    const [rows] = await db.query(query, [`%${q}%`]);
    return rows;
};

const searchCart = async (user_id, q) => {
    const query = `SELECT c.id, c.title, c.price, c.image_url
                   FROM cart ca
                   JOIN courses c ON ca.course_id = c.id
                   WHERE ca.user_id = ? AND c.title LIKE ?
                   ORDER BY ca.added_at DESC`;
    const [rows] = await db.query(query, [user_id, `%${q}%`]);
    return rows;
};

const searchWishlist = async (user_id, q) => {
    const query = `SELECT c.id, c.title, c.price, c.image_url
                   FROM wishlist w
                   JOIN courses c ON w.course_id = c.id
                   WHERE w.user_id = ? AND c.title LIKE ?
                   ORDER BY w.added_at DESC`;
    const [rows] = await db.query(query, [user_id, `%${q}%`]);
    return rows;
};

const searchMyCourses = async (user_id, q) => {
    const query = `SELECT c.id, c.title, c.price, c.image_url
                   FROM enrollments e
                   JOIN courses c ON e.course_id = c.id
                   WHERE e.user_id = ? AND c.title LIKE ?
                   ORDER BY e.enrolled_at DESC`;
    const [rows] = await db.query(query, [user_id, `%${q}%`]);
    return rows;
};

module.exports = {
    searchCourses,
    searchCart,
    searchWishlist,
    searchMyCourses
};
