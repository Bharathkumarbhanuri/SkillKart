const db = require('../config/db');

const fetchAllCourses = async()=>{
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
}

const insertCourse = async({ title, description, price, instructor, image_url })=>{
    const query = `INSERT into courses (title, description, price, instructor, image_url)
    VALUES (?, ?, ?, ?, ?)`;
    await db.query(query, [title, description, price, instructor, image_url]);
}

const updateCourseById = async(id,{ title, description, price, instructor, image_url })=>{
    const query = `UPDATE courses SET title = ?, description = ?, price = ?, instructor = ?, image_url = ?
        WHERE id = ?`;
    await db.query(query, [title, description, price, instructor, image_url, id]);
}

const deleteCourseById = async(id)=>{
    const query = 'DELETE FROM courses WHERE id = ?';
    await db.query(query, [id]);
}

const fetchCourseById = async(id)=>{
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
}

module.exports = { fetchAllCourses , insertCourse, updateCourseById, deleteCourseById, fetchCourseById};