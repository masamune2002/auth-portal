#!/usr/bin/env node
var db = require('../middleware/db');
var fs = require('fs');
var config = require('config');
var sqlPath = "bin/sql/"

try {
  db.init(config.db);
} catch(error) {
  console.log(error);
  console.log("Unable to complete setup. Make sure you're running this " +
              "script from the app's root directory.");
  process.exit();
}

var sql = fs.readFileSync(sqlPath + 'create-user-table.sql').toString();
db.query(sql, [], function(error) {
  if (error) {
    console.log("Unable to complete setup: " + error.toString());
  } else {
    console.log("Setup successful.");
  }
  process.exit();
});
