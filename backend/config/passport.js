const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim() || '';

module.exports = (passport) => {
  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_CALLBACK_URL
  ) {
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const role =
            ADMIN_EMAIL &&
            email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
              ? 'admin'
              : 'user';

          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            if (role === 'admin' && user.role !== 'admin') {
              user.role = 'admin';
              await user.save();
            }

            const token = jwt.sign(
              {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '7d',
              }
            );

            return done(null, { user, token });
          }

          const existingUser = await User.findOne({ email });

          if (existingUser) {
            existingUser.googleId = profile.id;
            existingUser.avatar = profile.photos[0]?.value || null;

            if (role === 'admin' && existingUser.role !== 'admin') {
              existingUser.role = 'admin';
            }

            await existingUser.save();

            const token = jwt.sign(
              {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '7d',
              }
            );

            return done(null, { user: existingUser, token });
          }

          const newUser = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            avatar: profile.photos[0]?.value || null,
            role,
          });

          const token = jwt.sign(
            {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '7d',
            }
          );

          done(null, { user: newUser, token });
        } catch (error) {
          console.error('Google OAuth Error:', error);
          done(error, null);
        }
      }
    )
  );
};