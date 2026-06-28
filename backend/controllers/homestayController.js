let homestays = require('../data/homestays');
let nextId = 7;

// @desc    Get all homestays
// @route   GET /api/homestays
const getHomestays = (req, res) => {
  res.status(200).json({
    success: true,
    count: homestays.length,
    data: homestays
  });
};

// @desc    Get single homestay by ID
// @route   GET /api/homestays/:id
const getHomestayById = (req, res) => {
  const id = parseInt(req.params.id);
  const homestay = homestays.find((h) => h.id === id);

  if (!homestay) {
    return res.status(404).json({
      success: false,
      message: 'Homestay not found'
    });
  }

  res.status(200).json({
    success: true,
    data: homestay
  });
};

// @desc    Search homestays by name or location
// @route   GET /api/homestays/search?q=
const searchHomestays = (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(200).json({
      success: true,
      count: homestays.length,
      data: homestays
    });
  }

  const query = q.toLowerCase();
  const results = homestays.filter(
    (h) =>
      h.name.toLowerCase().includes(query) ||
      h.location.toLowerCase().includes(query)
  );

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
};

// @desc    Create a new homestay
// @route   POST /api/homestays
const createHomestay = (req, res) => {
  const { name, location, price, rating, image, description, amenities } = req.body;

  // Validation
  if (!name || !location || !price) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: name, location, and price are required'
    });
  }

  const newHomestay = {
    id: nextId++,
    name,
    location,
    price,
    rating: rating || 0,
    image: image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
    description: description || '',
    amenities: amenities || []
  };

  homestays.push(newHomestay);

  res.status(201).json({
    success: true,
    data: newHomestay
  });
};

// @desc    Update a homestay
// @route   PUT /api/homestays/:id
const updateHomestay = (req, res) => {
  const id = parseInt(req.params.id);
  const index = homestays.findIndex((h) => h.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Homestay not found'
    });
  }

  const { name, location, price, rating, image, description, amenities } = req.body;

  homestays[index] = {
    ...homestays[index],
    ...(name && { name }),
    ...(location && { location }),
    ...(price && { price }),
    ...(rating && { rating }),
    ...(image && { image }),
    ...(description && { description }),
    ...(amenities && { amenities })
  };

  res.status(200).json({
    success: true,
    data: homestays[index]
  });
};

// @desc    Delete a homestay
// @route   DELETE /api/homestays/:id
const deleteHomestay = (req, res) => {
  const id = parseInt(req.params.id);
  const index = homestays.findIndex((h) => h.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Homestay not found'
    });
  }

  homestays.splice(index, 1);

  res.status(204).send();
};

module.exports = {
  getHomestays,
  getHomestayById,
  searchHomestays,
  createHomestay,
  updateHomestay,
  deleteHomestay
};