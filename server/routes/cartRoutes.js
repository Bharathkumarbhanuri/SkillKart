const express = require('express');
const router = express.Router();
const db = require('../config/db');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, cartController.addToCart);  
router.delete('/delete', authMiddleware, cartController.deleteFromCart);
router.get('/getcart', authMiddleware, cartController.getCart);
router.post('/movetowishlist', authMiddleware, cartController.movetowishlist);

module.exports = router; 