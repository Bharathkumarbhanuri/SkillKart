const db = require('../config/db');

const insertUser = async({ name, email, password_hash }) => {
    const query = `INSERT into users (name, email, password_hash, created_at)
    VALUES (?, ?, ?, now())`;
     await db.query(query, [name, email, password_hash]);
}

const fetchUserByEmail = async(email)=>{
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

module.exports = {insertUser, fetchUserByEmail};