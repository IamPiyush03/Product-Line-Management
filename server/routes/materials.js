const express = require('express');
const { check } = require('express-validator');
const { getMaterials, updateMaterial } = require('../controllers/materialController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getMaterials);

// PUT /api/materials/:id
router.put(
    '/:id',
    protect,
    authorizeRoles('Manager', 'Operator'),
    [
        check('currentStock', 'Current stock must be a number').optional().isNumeric(),
        check('minimumStockLevel', 'Minimum stock level must be a number').optional().isNumeric(),
    ],
    updateMaterial
);

module.exports = router;