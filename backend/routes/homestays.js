const express = require('express');
const router = express.Router();
const {
  getHomestays,
  getHomestayById,
  searchHomestays,
  createHomestay,
  updateHomestay,
  deleteHomestay
} = require('../controllers/homestayController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Search route must come before /:id to avoid "search" being treated as an id
router.get('/search', searchHomestays);

// Admin-only routes (create, update, delete)
router.route('/')
  .get(getHomestays)
  .post(protect, adminOnly, createHomestay);

router.route('/:id')
  .get(getHomestayById)
  .put(protect, adminOnly, updateHomestay)
  .delete(protect, adminOnly, deleteHomestay);

module.exports = router;