var Messages = Backbone.Collection.extend({
  model: Message,

  url: 'http://localhost:3000/classes/messages',
  // url: 'http://localhost:3000/classes/lobby',

  initialize: function() {
    var self = this;
    this.currentUser = 'Garrett';
    this.currentRoom = 'lobby';
    this.initializeRooms();
  },

  loadMessages: function() {
    var self = this;
    this.fetch();
  },

  parse: function(response, options) {
    return response.results;
  },

  changeUser: function(username) {
    this.currentUser = username;
  },

  changeRoom: function(roomname) {
    this.url = 'http://localhost:3000/classes/messages';
    // this.url = 'http://localhost:3000/classes/' + roomname;
    this.currentRoom = roomname;
    this.reset();
    this.loadMessages();
  },

  getRooms: function() {
    var roomList = {};
    var uniqueRooms = _.uniq(this.map(function(message) {
      return message.get('roomname');
    }));
    this.trigger('initializeRooms', uniqueRooms);
    this.url = 'http://localhost:3000/classes/messages';
    // this.url = 'http://localhost:3000/classes/lobby';
    this.changeRoom('lobby');
  },

  initializeRooms: function() {
    var self = this;
    self.url = 'http://localhost:3000/classes/messages';
    self.fetch({success: self.getRooms.bind(self)});
  }

});