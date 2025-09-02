const db = require('../config/db');

const fetchAllCourses = async()=>{
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
};

const insertCourse = async({ title, description, price, instructor, image_url, videos })=>{
    const query = `INSERT into courses (title, description, price, instructor, image_url, videos)
    VALUES (?, ?, ?, ?, ?, ?)`;
    await db.query(query, [title, description, price, instructor, image_url, JSON.stringify(videos|| [])]);
};

const updateCourseById = async(id,{ title, description, price, instructor, image_url, videos })=>{
    const query = `UPDATE courses SET title = ?, description = ?, price = ?, instructor = ?, image_url = ?, videos = ?
        WHERE id = ?`;
    await db.query(query, [title, description, price, instructor, image_url, JSON.stringify(videos|| []), id]);
};

const deleteCourseById = async(id)=>{
    const query = 'DELETE FROM courses WHERE id = ?';
    await db.query(query, [id]);
};

const fetchCourseById = async(id)=>{
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
};

const fetchBulkCourseByIds = async(courseIds)=>{
    if (!Array.isArray(courseIds) || courseIds.length === 0) return [];

    const placeholders = courseIds.map(() => "?").join(",");
    const [rows] = await db.query(`SELECT id, title, price FROM courses WHERE id IN (${placeholders})`, courseIds);
    return rows;
};

module.exports = { fetchAllCourses , insertCourse, updateCourseById, deleteCourseById, fetchCourseById, fetchBulkCourseByIds};