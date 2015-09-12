var RoomsView = Backbone.View.extend({
  tagName: 'ul',

  className: 'side-nav fixed room-list',

  template: _.template('\
    <li class="room-logo"><a class="">Rooms</a></li> \
    <div class="create-room"> \
      <a class="waves-effect waves-teal btn modal-trigger create-room" href="#modal2">Create Room</a> \
    </div> \
    '
  ),

  initialize: function() {
    var self = this;
    self.roomList = {};
    self.listenTo(self.collection, 'add', self.render);
    self.$el.html(self.template());

    self.createRoomHandler();
    self.render();
  },

  createRoomHandler: function() {
    var self = this;
    self.$('.modal-trigger.create-room').leanModal({
        opacity: .5, 
        in_duration: 300, 
        out_duration: 200, 
        complete: self.createRoom.bind(self)
      }
    );
  },

  createRoom: function() {
    var self = this;
    self.collection.trigger('createRoom', $('#room-name').val());
  },

  render: function() {
    var self = this;
    
    $('#room-name').val('');
    self.collection.map(function(room) {
      if(!(room.get('roomname') in self.roomList)) {
        self.roomList[room.get('roomname')] = true;
        self.$el.append(new RoomView({model: room}).render());
      }
    });

    return self.$el;
  },

});