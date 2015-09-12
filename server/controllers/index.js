var models = require('../models');
var mysql = require('mysql');
var waterfall = require('async-waterfall');


module.exports = {
  messages: {
    get: function (req, res) {
      var data = req.body;
      dbConnection = mysql.createConnection({
        user: "root",
        password: "",
        database: "chat"
      });
      dbConnection.connect();

      dbConnection.query('SELECT * FROM Messages', {message: data.message}, function(err, result) {
        if (err) throw err;
        dbConnection.end();
        res.status(201).end(JSON.stringify(result));
      });



         
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = req.body;
      dbConnection = mysql.createConnection({
        user: "root",
        password: "",
        database: "chat"
      });
      dbConnection.connect();

      dbConnection.query('INSERT INTO Messages SET ?', {message: data.message}, function(err, result) {
        if (err) throw err;
        dbConnection.end();
      });



      res.status(201).end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var data = req.body;
      dbConnection = mysql.createConnection({
        user: "root",
        password: "",
        database: "chat"
      });
      dbConnection.connect();

      dbConnection.query('SELECT * FROM Users WHERE username = ?', data.username, function(err, results) {
        if(results.length === 0 ) {
          dbConnection.query('INSERT INTO Users SET ?', data, function (err,results) {
            if (err) throw err;
            dbConnection.end();
          });
        }
      })


      // var query = 'SELECT * FROM Users WHERE username = ?';
      // dbConnection.query(query, data.username, function(err, results) {
      //   if (err) throw err;
      //   console.log(data);
      //   }

      // });

      res.status(201).end();

    }
  }
};