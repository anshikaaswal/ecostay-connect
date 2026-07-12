const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const homestayRoutes = require('./routes/homestays');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const passport = require('passport');
require('./config/passport')(passport);

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - allow frontend origins
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));

app.use(express.json());

// Initialize Passport for Google OAuth
app.use(passport.initialize());

// Google OAuth routes (only if credentials are configured)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect with token
      const { token } = req.user;
      const redirectUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${redirectUrl}/login?token=${token}`);
    }
  );
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/homestays', homestayRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to EcoStay Connect API',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    endpoints: {
      auth: '/api/auth',
      homestays: '/api/homestays',
      homestayById: '/api/homestays/:id',
      searchHomestays: '/api/homestays/search?q=',
      bookings: '/api/bookings',
      bookingById: '/api/bookings/:id',
    },
  });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});