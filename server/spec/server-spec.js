/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var Promise = require('bluebird');



describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    var truncate = function (table) {
      return new Promise(function(resolve, reject) {
        dbConnection.query("TRUNCATE " + table, function(err, res){
          if (err) throw err;
          resolve();
        });
      });
    };

    dbConnection.query('SET FOREIGN_KEY_CHECKS = 0', function(err, res) {
      if (err) throw err;
    });

    truncate('Users')
      .then(truncate('Messages'))
      .then(truncate('Rooms'))
      .then(truncate('UsersRooms'))
      .then(truncate('MessagesRooms'))
      .finally(done);

    dbConnection.query('SET FOREIGN_KEY_CHECKS = 1', function(err, res) {
      if (err) throw err;
    });

  });

  afterEach(function() {
    dbConnection.end();
  });


  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/users",
              json: { username: "Valjean" }
    }, function () {
      // Post a message to the node chat server:
      request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                message: "In mercy's name, three days is all I need.",
                roomname: "Hello"
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = "SELECT * FROM messages";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message).to.equal("In mercy's name, three days is all I need.");

          done();
        });
      });
    });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
       var tablename = "chat"; // TODO: fill this out
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query('INSERT INTO Messages SET ?', {message: 'Chris is awesome!'}, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].message).to.equal("Chris is awesome!");
        // expect(messageLog[0].roomname).to.equal("main");
        done();
      });
    });
  });
});
