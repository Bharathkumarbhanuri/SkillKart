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

const fetchUserById = async (id) => {
  const query = `
    SELECT id, name, email, phone, education, profile_pic AS profilePic
    FROM users WHERE id = ?
  `;
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

const updateUserById = async (id, { name, email, phone, education, profilePic }) => {
  const query = `
    UPDATE users
    SET
      name = ?,
      email = ?,
      phone = ?,
      education = ?,
      profile_pic = COALESCE(?, profile_pic)
    WHERE id = ?
  `;
  await db.query(query, [name, email, phone, education, profilePic, id]);
};


module.exports = {insertUser, fetchUserByEmail, fetchUserById, updateUserById};