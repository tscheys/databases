var db = require('../db');
var Promise = require('bluebird');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', '',
  {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  });
module.exports = sequelize;

/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var Users = sequelize.define('Users', {
  username: Sequelize.STRING
});

var Messages = sequelize.define('Messages', {
  message: Sequelize.STRING,
});
var Rooms = sequelize.define('Rooms', {
  roomname: Sequelize.STRING,
});
Rooms.belongsToMany(Users, {through: 'RoomsUsers', foreignKey: 'roomId'});
Users.belongsToMany(Rooms, {through: 'RoomsUsers', foreignKey: 'userId'});
Users.hasMany(Messages, {foreignKey: 'userId'});
Messages.belongsTo(Users, {foreignKey: 'userId'});
sequelize.sync();

module.exports = {
  messages: {
    get: function() {
      return new Promise(function(resolve, reject) {
        Messages.findAll({where:{}, include: [Users]}).then(function(messages) {
          console.log(messages);
          resolve(JSON.stringify(messages));
        });
      });
    },
    post: function(data) {
      return new Promise(function(resolve, reject) {
        Messages.create({message: data.message})
        .then(Rooms.findOrCreate({where: {roomname: data.roomname}, defaults: {roomname: 'lobby'}}))
        .then(Users.findOrCreate({where: {username: data.username}, defaults: {username: 'Anonymous'}}))
        .then(resolve);
      });
    }
  },
  users: {
    get: function() {
      return new Promise(function(resolve, reject) {
        Users.findAll().then(function(users) {
          resolve(JSON.stringify(users));
        });
      });
    },
    post: function(data) {
      console.log('kdjakJkjsfalhgfj');
      return new Promise(function(resolve, reject) {
        Users.create({username: data.username}).then(resolve);
      });
         
    }
  }
}

// module.exports = {
//   messages: {
//     get: function () {
//       var con = db.createConnection();
//       con.connect();
//       return new Promise(function(resolve,reject) {
//         con.query('SELECT * FROM Messages', [], function(err, result) {
//           if (err) reject(err);
//           con.end();
//           resolve(JSON.stringify(result));
//         });
//       });
//     }, // a function which produces all the messages
//     post: function (data) {
//       var con = db.createConnection();
//       con.connect();
//       console.log('message post');
//       return new Promise(function(resolve, reject) {
//         con.query('INSERT INTO Messages SET ?', {message: data.message}, function(err, result) {
//           if (err) reject(err);
//           con.end();
//           resolve();
//         });
//       });
//     }
//   },

//   users: {
//     // Ditto as above.
//     get: function () {},
//     post: function (data) {
//       var con = db.createConnection();
//       con.connect();
//       console.log('user post');
//       return new Promise(function(resolve, reject) {
//         con.query('SELECT * FROM Users WHERE username = ?', data.username, function(err, results) {
//           if(results.length === 0 ) {
//             con.query('INSERT INTO Users SET ?', data, function (err,results) {
//               if (err) reject(err);
//               con.end();
//               resolve();
//             });

//           }
//         });
//       });

    
//     }
//   }
// };

