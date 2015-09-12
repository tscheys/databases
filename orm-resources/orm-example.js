/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");
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




/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({username: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});
