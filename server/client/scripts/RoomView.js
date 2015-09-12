var RoomView = Backbone.View.extend({
  className: 'row room-row',

  template: _.template('\
    <div class="row room-row"> \
      <li class="room waves-effect waves-teal"> \
        <a class="room-label" href="#"><%- roomname %></a> \
      </li> \
    </div>'
  ),

  events: {
    'click .room-label': 'changeRoom'
  },

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  },

  changeRoom: function() {
   this.model.trigger('changeRoom', this.model.get('roomname')); 
  }
});