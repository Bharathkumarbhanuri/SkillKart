const Razorpay = require("razorpay");
const crypto = require("crypto");
const {fetchCourses, insertPayment} = require("../models/paymentModel");
const { enroll } = require("./enrollmentController"); // adjust path


// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
const createOrder = async (req, res) => {
  try {
    const { courses } = req.body;
    if (!courses || courses.length === 0) {
      return res.status(400).json({ message: "No courses provided" });
    }

    const rows = await fetchCourses(courses);
    const total = rows.reduce((sum, c) => sum + Number(c.price), 0);

    const options = {
      amount: total * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, total });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const user_id = req.user.id;

    // 1. Verify signature
    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }
    

    // 2. Record successful payment
    await insertPayment(
      user_id,
      razorpay_order_id,
      razorpay_payment_id,
      "SUCCESS"
    );

    req.body.courses = courses;
    await enroll(req, res);
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};

module.exports = { createOrder, verifyPayment };