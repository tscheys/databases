var FormView = Backbone.View.extend({
  className: 'row input input-row',

  initialize: function() {
    this.render();
  },

  events: {
    'click #sendButton': 'handleSubmit',
    'keypress #message': 'checkEnter'
  },

  handleSubmit: function() {
    var messageObj = {};
    messageObj.message = $("#message").val();
    messageObj.username = this.collection.currentUser;
    messageObj.roomname = this.collection.currentRoom;

    this.collection.create(messageObj);
    this.$('#message').val('');
  },

  checkEnter: function(e) {
    if (e.which === 13)
      this.handleSubmit();
  },

  render: function() {
    var $form = $('<input id="message" class="col s7 offset-s1 message-holder" type="text" placeholder="message"> \
            <a id="sendButton" class="col s2 waves-effect waves-light btn">Send</a>');

    this.$el.append($form);
  }
});