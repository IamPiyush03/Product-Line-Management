const express = require('express');
const { check } = require('express-validator');
const {
    getOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/orders
router.get('/', protect, getOrders);

// POST /api/orders (only Managers)
router.post(
    '/',
    protect,
    authorizeRoles('Manager'),
    [
        check('productName', 'Product name is required').not().isEmpty(),
        check('quantity', 'Quantity must be greater than 0').isInt({ gt: 0 }),
        check('priority', 'Priority must be High, Medium, or Low').isIn(['High', 'Medium', 'Low']),
    ],
    createOrder
);

// PUT /api/orders/:id/status (allowed for Operators)
router.put(
    '/:id/status',
    protect,
    [
        check('status', 'Status must be one of Planned, In Production, Quality Check, Completed').isIn([
            'Planned',
            'In Production',
            'Quality Check',
            'Completed'
        ]),
    ],
    updateOrderStatus
);

// DELETE /api/orders/:id (only Managers)
router.delete('/:id', protect, authorizeRoles('Manager'), deleteOrder);

module.exports = router;