var AppView = Backbone.View.extend({
  initialize: function(params) {
    this.messages = params.messages;
    this.rooms = new RoomsView({collection: params.rooms});
    this.card = new CardView({collection: params.messages});
    this.listenTo(params.rooms, 'updateRoom', this.changeRoom);
    this.listenTo(params.messages, 'initializeRooms', this.initializeRooms);
    this.render();
  },

  changeRoom: function(roomname) {
   this.messages.changeRoom(roomname);
  },

  initializeRooms: function(uniqueRooms) {
    var rooms = uniqueRooms.map(function(roomname) {
      return {roomname: roomname};
    });
    this.rooms.collection.add(rooms);
  },

  render: function() {
    this.$el.append([
      this.rooms.$el,
      this.card.$el
    ]);

    return this;
  },

});