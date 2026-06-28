let bookings = require('../data/bookings');
let nextId = 3;

// @desc    Get all bookings
// @route   GET /api/bookings
const getBookings = (req, res) => {
  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
};

// @desc    Create a new booking
// @route   POST /api/bookings
const createBooking = (req, res) => {
  const { user, homestayId, checkIn, checkOut } = req.body;

  // Validation
  if (!user || !homestayId || !checkIn || !checkOut) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: user, homestayId, checkIn, and checkOut are required'
    });
  }

  const newBooking = {
    id: nextId++,
    user,
    homestayId,
    checkIn,
    checkOut
  };

  bookings.push(newBooking);

  res.status(201).json({
    success: true,
    data: newBooking
  });
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
const deleteBooking = (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  bookings.splice(index, 1);

  res.status(204).send();
};

module.exports = {
  getBookings,
  createBooking,
  deleteBooking
};