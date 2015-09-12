var db = require('../db');
var Promise = require('bluebird');
module.exports = {
  messages: {
    get: function () {
      var con = db.createConnection();
      con.connect();
      return new Promise(function(resolve,reject) {
        con.query('SELECT * FROM Messages', [], function(err, result) {
          if (err) reject(err);
          con.end();
          resolve(JSON.stringify(result));
        });
      });
    }, // a function which produces all the messages
    post: function (data) {
      var con = db.createConnection();
      con.connect();
      console.log('message post');
      return new Promise(function(resolve, reject) {
        con.query('INSERT INTO Messages SET ?', {message: data.message}, function(err, result) {
          if (err) reject(err);
          con.end();
          resolve();
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data) {
      var con = db.createConnection();
      con.connect();
      console.log('user post');
      return new Promise(function(resolve, reject) {
        con.query('SELECT * FROM Users WHERE username = ?', data.username, function(err, results) {
          if(results.length === 0 ) {
            con.query('INSERT INTO Users SET ?', data, function (err,results) {
              if (err) reject(err);
              con.end();
              resolve();
            });

          }
        });
      });

    
    }
  }
};

