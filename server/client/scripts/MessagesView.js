var MessagesView = Backbone.View.extend({
  className: 'row chat-row',

  initialize: function() {
    var self = this;
    self.listenTo(self.collection, 'add', self.render);
    self.listenTo(self.collection, 'reset', self.clearMessages);
    self.messages = {};
    self.render();

    // scroll to bottom after 200ms to fix scroll not reaching bottom on init
    setTimeout(self.scrollToBottom.bind(self), 200);
  },

  render: function() {
    var self = this;

    self.collection.forEach(function(message) {
      if (!(message.cid in self.messages)) {
        self.messages[message.cid] = true;
        self.$el.append(new MessageView({model: message}).render());
      }
    });

    self.scrollToBottom();

    return self;
  },

  clearMessages: function() {
    this.messages = {};
    this.$el.empty();
  },

  scrollToBottom: function() {
    this.$el[0].scrollTop = this.$el[0].scrollHeight;
  }

});