const express = require('express');
const router = express.Router();
const db = require('../config/db');
const searchController = require('../controllers/searchController');

router.get('/', searchController.search);

module.exports = router;