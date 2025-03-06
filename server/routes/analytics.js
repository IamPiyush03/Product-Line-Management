const express = require('express');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { getOverview } = require('../controllers/analyticsController');
const router = express.Router();

// Protected analytics route (Managers only for full overview)
router.get('/overview', protect, authorizeRoles('Manager'), getOverview);

module.exports = router;