const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'anshikaaswal687@gmail.com';

module.exports = (passport) => {
  // Only configure Google OAuth if credentials are provided
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log('Google OAuth credentials not found. Skipping Google OAuth setup.');
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Determine role based on email
          const email = profile.emails[0].value;
          const role = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'user';

          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // Update role if email matches admin (covers edge case where role wasn't set before)
            if (role === 'admin' && user.role !== 'admin') {
              user.role = 'admin';
              await user.save();
            }
            // User exists, generate token with role
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
              expiresIn: '7d',
            });
            return done(null, { user, token });
          }

          // Check if user exists with same email
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            // Link Google account to existing user and update role if needed
            existingUser.googleId = profile.id;
            existingUser.avatar = profile.photos[0]?.value || null;
            if (role === 'admin' && existingUser.role !== 'admin') {
              existingUser.role = 'admin';
            }
            await existingUser.save();
            const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, {
              expiresIn: '7d',
            });
            return done(null, { user: existingUser, token });
          }

          // Create new user from Google profile with admin role if applicable
          const newUser = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            avatar: profile.photos[0]?.value || null,
            role,
          });

          const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '7d',
          });

          done(null, { user: newUser, token });
        } catch (error) {
          console.error('Google OAuth Error:', error);
          done(error, null);
        }
      }
    )
  );
};