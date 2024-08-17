// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { UserTable } = require('../models');

// Configure Passport to use the Local Strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await UserTable.findOne({ where: { username } });
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserTable.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


module.exports = passport;
