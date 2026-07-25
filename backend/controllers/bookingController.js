const Booking = require('../models/Booking');
const Homestay = require('../models/Homestay');
const getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === 'admin') {
      bookings = await Booking.find().populate('homestay').sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find({ email: req.user.email }).populate('homestay').sort({ createdAt: -1 });
    }
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
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('homestay');
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    if (req.user.role !== 'admin' && booking.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only view your own bookings',
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
const createBooking = async (req, res) => {
  try {
    const { userName, email, homestayId, checkIn, checkOut, guests } = req.body;
    if (!userName || !email || !homestayId || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: userName, email, homestayId, checkIn, and checkOut are required',
      });
    }
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
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    if (req.user.role !== 'admin' && booking.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only delete your own bookings',
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