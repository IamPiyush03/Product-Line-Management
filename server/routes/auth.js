const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// POST /api/auth/register
router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
        check('role', 'Role must be Manager or Operator').isIn(['Manager', 'Operator']),
        check('department', 'Department is required').not().isEmpty(),
    ],
    registerUser
);

// POST /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    loginUser
);

module.exports = router;