const db = require('../config/db');


const insertToList = async(user_id, course_id) => {
    const query = `INSERT INTO wishlist(user_id, course_id) 
                    VALUES(?,?) ON DUPLICATE KEY UPDATE added_at = CURRENT_TIMESTAMP`;
    await db.query(query,[user_id, course_id]);
};

const fetchList = async(user_id) => {
    const query = `SELECT c.id AS id, c.title AS title, c.price AS price, c.image_url AS image
        FROM wishlist w         
        JOIN courses c ON w.course_id = c.id 
        WHERE w.user_id = ?
        ORDER BY w.added_at DESC
    `;
    const [rows] = await db.query(query, [user_id]);
    return rows;
};

const removeFromList = async(user_id, course_id)=> {
    const query = `DELETE FROM wishlist where user_id = ? AND course_id = ?`;
    await db.query(query,[user_id, course_id]);
}

const moveFromListToCart = async(user_id, course_id)=> {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // 1. Remove from wishlist
        await conn.query(
            `DELETE FROM wishlist WHERE user_id = ? AND course_id = ?`,
            [user_id, course_id]
        );

        // 2. Insert into cart
        await conn.query(
            `INSERT INTO cart(user_id, course_id) 
             VALUES (?, ?) ON DUPLICATE KEY UPDATE added_at = CURRENT_TIMESTAMP`,
            [user_id, course_id]
        );
        
        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

module.exports = {insertToList, fetchList, removeFromList, moveFromListToCart};