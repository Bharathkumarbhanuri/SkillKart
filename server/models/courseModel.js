const db = require('../config/db');

const fetchAllCourses = async()=>{
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
}

module.exports = { fetchAllCourses };