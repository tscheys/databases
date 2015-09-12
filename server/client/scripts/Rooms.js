var Rooms = Backbone.Collection.extend({
  model: Room,

  initialize: function() {
    this.add({roomname: 'lobby'});
    var self = this;
    this.listenTo(this, 'createRoom', this.createRoom);
    this.listenTo(this, 'changeRoom', this.changeRoom);
    this.currentRoom = 'lobby';
  },

  createRoom: function(roomname) {
    roomname = (roomname === '') ? 'lobby' : roomname;
    this.add({roomname: roomname});
    this.changeRoom(roomname);
  },

  changeRoom: function(roomname) {
    this.currentRoom = roomname;
    this.trigger('updateRoom', this.currentRoom);
  }
});