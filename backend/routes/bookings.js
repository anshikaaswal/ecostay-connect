const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
} = require('../controllers/bookingController');

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBookingById)
  .delete(deleteBooking);

module.exports = router;