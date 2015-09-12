var CardView = Backbone.View.extend({
  tagName: 'main',

  initialize: function() {
    this.user = new UserView({collection: this.collection});
    this.messages = new MessagesView({collection: this.collection});
    this.form = new FormView({collection: this.collection});
    this.render();
  },

  render: function() {
    this.$el.append($('<div>', {
      class: 'container chat-window'
    }).append($('<div>', {
      class: 'card chat-window'
    }).append([
            this.user.$el,
            this.messages.$el,
            this.form.$el
    ])));

    return this;
  }
});