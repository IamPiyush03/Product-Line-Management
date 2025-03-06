const express = require('express');
const { getWorkstations } = require('../controllers/workstationsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getWorkstations);

module.exports = router;