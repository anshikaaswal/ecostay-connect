const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.type === 'validation') {
    return res.status(400).json({
      success: false,
      message: err.message || 'Validation Error'
    });
  }

  if (err.type === 'not_found') {
    return res.status(404).json({
      success: false,
      message: err.message || 'Resource not found'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
};

module.exports = errorHandler;