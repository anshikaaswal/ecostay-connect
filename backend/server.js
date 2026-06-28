const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const homestayRoutes = require('./routes/homestays');
const bookingRoutes = require('./routes/bookings');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/homestays', homestayRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to EcoStay Connect API',
    version: '1.0.0',
    endpoints: {
      homestays: '/api/homestays',
      homestayById: '/api/homestays/:id',
      searchHomestays: '/api/homestays/search?q=',
      bookings: '/api/bookings'
    }
  });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});