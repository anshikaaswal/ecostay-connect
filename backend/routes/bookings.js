const express = require('express');
const router = express.Router();
const {
  getBookings,
  createBooking,
  deleteBooking
} = require('../controllers/bookingController');

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .delete(deleteBooking);

module.exports = router;