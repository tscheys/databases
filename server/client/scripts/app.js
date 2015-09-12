$(document).ready(function() {
  var rooms = new Rooms();
  var messages = new Messages();
  var app = new AppView({el: $('body'), rooms: rooms, messages: messages});
});