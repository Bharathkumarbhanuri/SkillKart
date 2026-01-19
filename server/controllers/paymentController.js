const Razorpay = require("razorpay");
const crypto = require("crypto");
const {fetchCourses, insertPayment} = require("../models/paymentModel");
const { enroll } = require("./enrollmentController"); // adjust path

// ===== Dummy mode switch =====
// Set PAYMENT_MODE=DUMMY to bypass Razorpay
const PAYMENT_MODE = (process.env.PAYMENT_MODE || "RAZORPAY").toUpperCase();
const IS_DUMMY = PAYMENT_MODE === "DUMMY";

// Razorpay instance (only used when NOT dummy)
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

    // ✅ Dummy order (no Razorpay call)
    if (IS_DUMMY) {
      const dummyOrder = {
        id: `dummy_order_${Date.now()}`,
        amount: total * 100,
        currency: "INR",
      };
      return res.json({ order: dummyOrder, total, dummy: true });
    }

    const options = {
      amount: total * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, total, dummy: false });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
        const { dummy, razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const user_id = req.user.id;

    if (!courses || courses.length === 0) {
      return res.status(400).json({ message: "No courses provided" });
    }

    // ✅ Dummy verification (skip signature check)
    if (IS_DUMMY || dummy === true) {
      const orderId = razorpay_order_id || `dummy_order_${Date.now()}`;
      const paymentId = razorpay_payment_id || `dummy_payment_${Date.now()}`;

      await insertPayment(user_id, orderId, paymentId, "SUCCESS");

      req.body.courses = courses;
      return await enroll(req, res);
    }

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
    return await enroll(req, res);
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};

module.exports = { createOrder, verifyPayment };