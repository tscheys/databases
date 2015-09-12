var Message = Backbone.Model.extend({
  initialize: function(message) {
    this.set('text', message.text);
    this.set('roomName', message.roomname);
    if ($.trim(message.username) === '')
      this.set('user', 'Anonymous');
    else
      this.set('user', message.username);
    if ($.trim(message.text) === '')
      this.set('text', ' ');
    else
      this.set('user', message.username);
    this.set('objectId', message.objectId);
  },
});

var Messages = Backbone.Collection.extend({
  model: Message
});

var MessagesView = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function() {
    var roomNames = [];
    this.model.each(function(message) {
      //check if new room
      // add if new room
      var cur = message.get('roomName');
      if (!rooms.hasOwnProperty(cur) && $.trim(cur) !== '') {
        rooms[cur] = 1;
        roomNames.push(cur);
      }
    }, {});


    $('.room-list').append(roomNames.map(function(room) {
      var escaped = _.template("<%- rooms %>")({rooms : room});
      var html = [
        "<div class='row room-row'>",
        "<li class='room waves-effect waves-teal'><a href='#'>",
        escaped,
        "</a></li></div>"].join('');
      return html;
    }));

    $('.chat-row').empty();
    $(".chat-row").append(this.model.map(function(message) {
      if (message.get('roomName') !== currentRoom || message.get('username') === undefined)
        return '';
      var randomImage = "./images/" + hashCode(message.get('username'), 39) + ".jpg";
      var html = [
        '<div class="row">',
        '<div class="col face-col">',
        '<img class="user-image" src="' + randomImage + '">',
        '</div>',
        '<div class="col message-col">',
        '<h5>',
        _.template("<%- name %>")({name : message.get('user')}),
        '</h5>',
        '<p>',
        _.template("<%- text %>")({text : message.get('text')}),
        '</p>',
        '<div class="divider"></div>',
        '</div>'].join('');
      return html;
    }));
    return this.$el;
  }
});

var rooms = {};
var currentRoom = 'lobby';
var currentUser = 'Garrett';

function showMessages(msgs) {
  msgs.reverse();
  var messageList = [];
  for (var i = 0; i < msgs.length; i++) {
    messageList.push(new Message(msgs[i]));
  }

  var messages = new Messages(messageList);
  var messagesView = new MessagesView({model: messages});
  messagesView.remove();
  $('.chats').prepend(messagesView.render());
}
function hashCode(str, max) {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % max;
};
$(document).ready(function() {

  $('select').material_select();
  $('.modal-trigger.current-user').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      ready: function() {
      }
      , // Callback for Modal open
      complete: changeUser // Callback for Modal close
    }
  );
  $('.modal-trigger.create-room').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      ready: function() {
      }
      , // Callback for Modal open
      complete: changeRoom // Callback for Modal close
    }
  );

  function changeUser() {
    var newUsername = $.trim($("#user").val());
    currentUser = newUsername;
    $('.current-user').text(newUsername);
  }

  function changeRoom() {
    var newRoom = $.trim($("#room-name").val());
    currentRoom = newRoom;
    sendMessage();
  }


  $("#sendButton").click(function() {
    sendMessage();
  });

  function sendMessage() {
    var messageObj = {};
    messageObj.text = $("#message").val();
    messageObj.username = currentUser;
    messageObj.roomname = currentRoom;
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(messageObj),
      contentType: 'application/json',
      success: function () {
        console.log('message sent');
        $('#message').val('');
      },
      error: function () {
        console.log('message not sent');
      }
    });
  }

  $('#message').keypress(function (e) {
    console.log(e.which);
    if (e.which == 13) {
      console.log("EVENT DETECETED!")
      sendMessage();
      return false;
    }
  });


  var scrolled = false;
  function updateScroll(){
    var element = $('.chat-row')[0];
    if(!scrolled){
      element.scrollTop = element.scrollHeight;
    }
    if (element.scrollTop === element.scrollHeight) {
      scrolled = false;
    }
  }

  $(".chat-row").on('scroll', function(){
      scrolled=true;
  });

  $('.room-list').on("click", ".room a", function() {
    roomName = $(this).text();
    currentRoom = roomName;
    $('.room').each(function() {
      var elementRoomName = $($(this).children()[0]).text();
      var element = $(this);
      if (elementRoomName === currentRoom)
        element.addClass('selected-room');
      else
        element.removeClass('selected-room');
      console.log(element);
    });
  });

  setInterval(function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function (data) {
        showMessages(data.results);
        updateScroll();
      },
      error: function () {
      }
    });
  }, 100);

});