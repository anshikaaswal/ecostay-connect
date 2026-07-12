const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // User exists, generate token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d',
            });
            return done(null, { user, token });
          }

          // Check if user exists with same email
          const existingUser = await User.findOne({ email: profile.emails[0].value });
          if (existingUser) {
            // Link Google account to existing user
            existingUser.googleId = profile.id;
            existingUser.avatar = profile.photos[0]?.value || null;
            await existingUser.save();
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
              expiresIn: '7d',
            });
            return done(null, { user: existingUser, token });
          }

          // Create new user from Google profile
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            avatar: profile.photos[0]?.value || null,
          });

          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
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