var pg = require('pg');
var _ = require('lodash');

var connectionString = "";

module.exports = {
  init: function (config) {
    try {
      connectionString = buildConnectionString(config);
    } catch (error) {
      throw new Error("Unable to connect to database: " + error.message);
    }

    pg.connect(connectionString, function (error, client, done) {
      done();
    });
  },

  query: function (text, values, callback) {
    if (_.isEmpty(connectionString)) {
      callback(new Error("Database connection has not been configured"));
    }

    pg.connect(connectionString, function (error, client, done) {
      client.query(text, values, function (error, result) {
        done();
        callback(error, result);
      })
    });
  }
};

function buildConnectionString(config) {
  var str = "";
  if (_.isEmpty(config)) {
    throw new Error("No database configuration found")
  }

  if (_.isEmpty(config.username)) {
    throw new Error("Missing database username configuration");
  } else {
    str += "postgres://" + config.username;
  }

  if (_.isEmpty(config.password)) {
    console.debug("Missing database password configuration. Attempting to connect without password.");
  } else {
    str += ":" + config.password;
  }

  if (_.isEmpty(config.host)) {
    throw new Error("Missing database host configuration");
  } else {
    str += "@" + config.host;
  }

  if (_.isEmpty(config.db)) {
    throw new Error("Missing database name configuration");
  } else {
    str += "/" + config.db;
  }

  return str;
}