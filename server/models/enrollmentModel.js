const db = require('../config/db');

const enrollCourse = async(user_id, course_id) => {
    const query = `INSERT INTO enrollments(user_id, course_id) VALUES(?, ?)
                    ON DUPLICATE KEY UPDATE enrolled_at = CURRENT_TIMESTAMP`;
    await db.query(query,[user_id, course_id]);
};

const getCourseTitleandPrice = async(course_id) => {
    const query = `SELECT title, price FROM courses WHERE id = ?`;
    const [rows] = await db.query(query,[course_id]);
    return rows[0];
};

const checkEnrollment = async(user_id, course_id) => {
    const query = `SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?`;
    const [rows] = await db.query(query,[user_id, course_id]);
    return rows.length>0;
};

const fetchEnrolledCourses  = async(user_id) => {
    const query = `select c.id AS id, c.title AS title, c.price AS price, c.image_url AS image_url FROM enrollments e
                    JOIN courses c ON e.course_id = c.id  WHERE e.user_id = ?
                    ORDER BY e.enrolled_at DESC`;
    const [rows] = await db.query(query,[user_id]);
    return rows;
};

module.exports = { enrollCourse, getCourseTitleandPrice, checkEnrollment, fetchEnrolledCourses};