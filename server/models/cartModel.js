const db = require('../config/db');

const insertToCart = async(user_id,course_id) => {
    const query = `INSERT INTO cart (user_id,course_id) 
                    VALUES(?,?) ON DUPLICATE KEY UPDATE added_at = CURRENT_TIMESTAMP`;
    await db.query(query,[user_id,course_id]);
};

const fetchCart = async(user_id) => {
    const query = `select c.id AS id, c.title AS title, c.price AS price, c.image_url AS image FROM cart ca
                    JOIN courses c ON ca.course_id = c.id  WHERE ca.user_id = ?
                    ORDER BY ca.added_at DESC`;
    const [rows] = await db.query(query,[user_id]);
    return rows;
};

const removeFromCart = async(user_id, course_id) => {
    const query = `DELETE FROM cart WHERE user_id = ? AND course_id = ?`;
    await db.query(query,[user_id, course_id]);
};

const moveFromCartToList = async(user_id, course_id) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // 1. Insert into wishlist
        const [insertRes] = await conn.query(
            `INSERT INTO wishlist(user_id, course_id) 
             VALUES (?, ?) ON DUPLICATE KEY UPDATE added_at = CURRENT_TIMESTAMP`,
            [user_id, course_id]
        );

        // 2. Remove from cart
        const [deleteRes] = await conn.query(
            `DELETE FROM cart WHERE user_id = ? AND course_id = ?`,
            [user_id, course_id]
        );


        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};


module.exports = {insertToCart, fetchCart, removeFromCart, moveFromCartToList};