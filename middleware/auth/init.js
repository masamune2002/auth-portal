var login = require('./login');
var signup = require('./signup');
var users = require('../../model/users');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.user_id);
  });

  passport.deserializeUser(function (id, done) {
    users.getUserById(id, function (err, user) {
      done(err, user);
    });
  });

  // Setting up Passport Strategies
  login(passport);
  signup(passport);
};