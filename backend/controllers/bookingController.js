const Booking = require('../models/Booking');
const Homestay = require('../models/Homestay');

// @desc    Get all bookings
// @route   GET /api/bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('homestay').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('homestay');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create a new booking
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { userName, email, homestayId, checkIn, checkOut, guests } = req.body;

    // Validation
    if (!userName || !email || !homestayId || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: userName, email, homestayId, checkIn, and checkOut are required',
      });
    }

    // Check if homestay exists
    const homestay = await Homestay.findById(homestayId);
    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found',
      });
    }

    const booking = await Booking.create({
      userName,
      email,
      homestay: homestayId,
      checkIn,
      checkOut,
      guests: guests || 1,
    });

    const populatedBooking = await Booking.findById(booking._id).populate('homestay');

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
};