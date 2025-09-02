const express = require('express');
const router = express.Router();
const db = require('../config/db');
const PaymentController = require("../controllers/paymentController");
const authMiddleware = require('../middleware/authMiddleware');

router.post("/create-order", authMiddleware, PaymentController.createOrder); 
router.post("/verify", authMiddleware, PaymentController.verifyPayment);

module.exports = router; 