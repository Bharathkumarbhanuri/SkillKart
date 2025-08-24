const express = require('express');
const router = express.Router();
const db = require('../config/db');
const wishlistController = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, wishlistController.addToList);
router.delete('/delete', authMiddleware, wishlistController.deleteFromList);
router.get('/getwishlist', authMiddleware, wishlistController.getList);
router.post('/movetocart', authMiddleware, wishlistController.moveToCart);

module.exports = router;