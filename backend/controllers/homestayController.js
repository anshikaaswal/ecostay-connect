const Homestay = require('../models/Homestay');

// @desc    Get all homestays
// @route   GET /api/homestays
const getHomestays = async (req, res) => {
  try {
    const homestays = await Homestay.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: homestays.length,
      data: homestays,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get single homestay by ID
// @route   GET /api/homestays/:id
const getHomestayById = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found',
      });
    }

    res.status(200).json({
      success: true,
      data: homestay,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid homestay ID format',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Search homestays by name or location
// @route   GET /api/homestays/search?q=
const searchHomestays = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      const homestays = await Homestay.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: homestays.length,
        data: homestays,
      });
    }

    const query = q.toLowerCase();
    const results = await Homestay.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create a new homestay
// @route   POST /api/homestays
const createHomestay = async (req, res) => {
  try {
    const { name, location, price, rating, image, description, amenities } = req.body;

    // Validation
    if (!name || !location || !price) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: name, location, and price are required',
      });
    }

    const homestay = await Homestay.create({
      name,
      location,
      price,
      rating: rating || 0,
      image: image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
      description: description || '',
      amenities: amenities || [],
    });

    res.status(201).json({
      success: true,
      data: homestay,
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

// @desc    Update a homestay
// @route   PUT /api/homestays/:id
const updateHomestay = async (req, res) => {
  try {
    const { name, location, price, rating, image, description, amenities } = req.body;

    let homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found',
      });
    }

    homestay = await Homestay.findByIdAndUpdate(
      req.params.id,
      { $set: { name, location, price, rating, image, description, amenities } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: homestay,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid homestay ID format',
      });
    }
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

// @desc    Delete a homestay
// @route   DELETE /api/homestays/:id
const deleteHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found',
      });
    }

    await Homestay.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid homestay ID format',
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
  getHomestays,
  getHomestayById,
  searchHomestays,
  createHomestay,
  updateHomestay,
  deleteHomestay,
};