const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profilePics/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);

router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, upload.single('profilePic'), userController.updateUserProfile);
module.exports = router;