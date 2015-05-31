var express = require('express');
var bodyParser = require("body-parser");
var config = require('config');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view-engine', 'html');

// Configure Database
var db = require('./middleware/db');
db.init(config.db);

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');

app.use(expressSession({
  secret: config.auth.secret,
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Initialize Passport
var initPassport = require('./middleware/auth/init');
initPassport(passport);

var routes = require('./routes')(passport);
app.use('/', routes);

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;