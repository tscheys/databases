
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', '',
  {
    host: 'localhost',
    dialect: 'mysql'
  });
// module.exports = sequelize;

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
  rooms: Sequelize.STRING,
});
Rooms.belongsToMany(Users, {through: 'bridges', foreignKey: 'roomId'});
Users.belongsToMany(Rooms, {through: 'bridges', foreignKey: 'userId'});
Users.hasMany(Messages, {as: 'Chatlog'});


