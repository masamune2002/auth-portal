var db = require('../middleware/db');

module.exports = {
  getUserByName: function (user, callback) {
    db.query("SELECT * FROM app.user WHERE user_name=$1", [user], function (error, result) {
      if (error || !result || !result.rows) {
        console.log("Unable to retrieve user " + user + ".");
        console.log(error);
        return;
      }
      callback(error, result.rows[0] || null);
    });
  },

  getUserById: function (id, callback) {
    db.query("SELECT * FROM app.user WHERE user_id=$1", [id], function (error, result) {
      if (error || !result || !result.rows) {
        console.log("Unable to retrieve user with id " + id + ":\n" + error);
        return;
      }
      callback(error, result.rows[0] || null);
    });
  },

  createUser: function (id, username, password, callback) {
    db.query("INSERT INTO app.user VALUES($1,$2,$3)", [id, username, password], function (error, result) {
      if (error || !result || !result.rows) {
        console.log("Unable to retrieve user with id " + id + ":\n" + error);
        return;
      }
      callback(error, result.rows[0] || null);
    });
  }
};