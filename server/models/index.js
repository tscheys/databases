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
Rooms.belongsToMany(Users, {through: 'bridges', foreignKey: 'roomId'});
Users.belongsToMany(Rooms, {through: 'bridges', foreignKey: 'userId'});
Users.hasMany(Messages, {as: 'Chatlog'});
sequelize.sync();

module.exports = {
  messages: {
    get: function() {
      return new Promise(function(resolve, reject) {
        Messages.findAll().then(function(messages) {
          resolve(JSON.stringify(messages));
        });
      });
    },
    post: function(data) {
      return new Promise(function(resolve, reject) {
        console.log('WQEQTWYRETRYWEOQUQW');
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
