var localStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var users = require('../../model/users');

module.exports = function (passport) {
  passport.use('login', new localStrategy(
      function (username, password, done) {
        users.getUserByName(username, function (error, user) {
          login(error, username, password, user, done);
        });
      })
  );
};

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function login(error, username, password, user, done) {
  if (error) {
    console.log(error);
    return done(error);
  }
  // Username does not exist
  if (!user) {
    console.log('User Not Found with username ' + username);
    return done(null, false, { message: 'Incorrect username.' });
  }
  // User exists but wrong password
  if (!isValidPassword(user, password)) {
    console.log('Invalid Password');
    return done(null, false, { message: 'Incorrect password.' }); // redirect back to login page
  }

  return done(null, user);
}