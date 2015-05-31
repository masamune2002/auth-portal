var localStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var uuid = require('node-uuid');
var users = require('../../model/users');

module.exports = function (passport) {
  passport.use('signup', new localStrategy(
      function (username, password, done) {
        users.getUserByName(username, function (error, user) {
          if (error) {
            console.log(error);
            return done(error);
          } else if (user) {
            console.log('User ' + username + ' already exists!');
            return done(null, false, { message: 'User already exists' });
          } else {
            signup(username, password, done);
          }
        });
      })
  );
};

function signup(username, password, done) {
  var newUser = {
    user_id: uuid.v1(),
    username: username,
    password: bCrypt.hashSync(password)
  };

  users.createUser(newUser.user_id, newUser.username, newUser.password, function (error) {
    if (error) {
      console.log('Failed to write user to the database');
      throw error;
    }
    console.log('User registration successful');
    return done(null, newUser);
  });
}