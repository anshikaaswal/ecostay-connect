const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Protected routes (require authentication)
router.route('/')
  .get(protect, getBookings)
  .post(protect, createBooking);

router.route('/:id')
  .get(protect, getBookingById)
  .delete(protect, deleteBooking);

module.exports = router;