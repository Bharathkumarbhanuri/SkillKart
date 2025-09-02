const db = require("../config/db");

// Fetch selected courses
const fetchCourses = async (courseIds) => {
  const query = `SELECT id, price FROM courses WHERE id IN (?)`;
  const [rows] = await db.query(query, [courseIds]);
  return rows;
};

// Insert into payments table
const insertPayment = async (user_id, order_id, payment_id, status) => {
  const query = `
    INSERT INTO payments (user_id, razorpay_order_id, razorpay_payment_id, status) 
    VALUES (?, ?, ?, ?)
  `;
  await db.query(query, [user_id, order_id, payment_id, status]);
};


module.exports = { fetchCourses, insertPayment };
