const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, getAuthConfig } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validators');
const { authLimiter } = require('../middleware/rateLimiter');

// Public config endpoint (no rate limit)
router.get('/config', getAuthConfig);

// Rate limiting only on login/register (NOT on /me)
router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);

// GET /api/auth/me (protected) - no rate limiter
router.get('/me', protect, getMe);

// PUT /api/auth/profile (protected)
router.put('/profile', protect, updateProfile);

module.exports = router;