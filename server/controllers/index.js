var models = require('../models');
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function (req, res) {
      console.log('here');
      models.messages.get().then(function(data) {
        res.status(201).end(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body).then(function() {
        res.status(201).end();
      });
      console.log('here');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get().then(function(data) {
        res.status(201).end(data);
      });
      console.log('here');
    },
    post: function (req, res) {
      models.users.post(req.body)
      .then(function() {
        res.status(201).end();
      })
      console.log('here');
    }
  }
};