var express = require('express');
var router = express.Router();
var users = require('../model/users');
var config = require('config');

module.exports = function (passport) {
  router.post('/login', passport.authenticate('login', { failureFlash: true }),
    function (req, res) {
      res.json(req.body);
    });

  router.post('/signup', passport.authenticate('signup', { failureFlash: true }),
    function (req, res) {
      res.json(req.body);
    });

  router.post('/deleteUser', function(req, res) {
    var user = req.body.username;
    users.deleteUser(user, config.auth.softDelete, function(error) {
      if (error) {
        console.log(error);
        res.status(500).send('Unable to delete user ' + user + ".");
      }
    })
    res.json(req.body);
  });

  return router;
};

var isAuthenticated = function (req, res, next) {
  console.log("isAuthenticated");
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
};
