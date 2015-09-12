var UserView = Backbone.View.extend({
  className: 'row user-row',

  template: _.template('\
    <div class="row user-row"> \
      <i class="material-icons prefix col s1 medium account-circle">perm_identity</i> \
      <span class="username col s10"><a class="modal-trigger current-user" href="#modal1"><%- username %></a></span> \
    </div> \
    <div id="modal1" class="modal user-modal"> \
      <div class="modal-content"> \
        <h4>Change username</h4> \
        <input id="user" class="" type="text" placeholder="Username" > \
      </div> \
      <div class="modal-footer"> \
        <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Accept</a> \
      </div> \
    </div>'
  ),

  initialize: function() {
    var self = this;
    self.render();
    self.setCurrentUserHandler();
  },

  setCurrentUserHandler: function() {
    var self = this;
    self.$('.modal-trigger.current-user').leanModal({
        opacity: .5, 
        in_duration: 300, 
        out_duration: 200, 
        complete: self.changeUser.bind(self) 
      }
    );
  },

  render: function() {
    this.$el.html(this.template({username: this.collection.currentUser}));
  },

  changeUser: function() {
    var username = this.$('#user').val();
    this.collection.currentUser = username;
    this.$('.current-user').text(username);
  }
});