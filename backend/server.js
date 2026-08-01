const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const homestayRoutes = require('./routes/homestays');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const passport = require('passport');
require('./config/passport')(passport);
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const frontendOrigin = process.env.FRONTEND_URL?.replace(/\/$/, '') || '';
const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const allowedOrigins = [frontendOrigin].filter(Boolean);
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || localhostPattern.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  app.get('/api/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
      const { token } = req.user;
      res.redirect(`${frontendOrigin}/login?token=${token}`);
    }
  );
}
app.use('/api/auth', authRoutes);
app.use('/api/homestays', homestayRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ai', aiRoutes);
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
      aiPlanner: '/api/ai/planner',
    },
  });
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});