$(document).ready(function() {// YOUR CODE HERE:
  var messages = [];
  var messageHashes = {};
  var rooms = {};
  var roomName;
  var friends = {};

  function addNewMessages(msgs) {
    for (var i = 0; i < msgs.length; i++) {
      var msg = msgs[i];
      if (!messageHashes.hasOwnProperty(msg.objectId)) {
        messages.push(msg);
        rooms[msg.roomname] = 1;
      }
      messageHashes[msg.objectId] = 1;
    }
  }

  $('.dropdown-menu').on("click", ".room a", function() {
    roomName = $(this).text();
    $('.dropdown button').text(roomName);
  });

  $('.chats').on("click", ".message", function() {
    friends[($(this).text().split(' :')[0])] = 1;
  });

  function generateRoomList() {
      
    $('.dropdown-menu').empty();
    for (var key in rooms) {
      if (rooms.hasOwnProperty(key)) {
        var anchor = $('<a/>', {
          href: '#',
          text: key
        });

        var listItem = $('<li/>', {
          class: 'room'
        });
        $('.dropdown-menu').append(listItem.append(anchor));
      }
    }
  }

  function displayMessages() {
    roomName = roomName || "lobby";
    $('.chats').empty();  
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].roomname === roomName) {
        var message = $('<li/>', {
          'class': 'message',
          text: messages[i].username + " : " +  messages[i].text
        }).appendTo('.chats');
        if (friends.hasOwnProperty(messages[i].username)) {
          

          message.css("font-weight", "bold");
        }
      }
    }
  }

  $("#sendButton").click(function() {
    var messageObj = {};
    messageObj.text = $("#message").val();
    messageObj.username = $("#username").val();
    messageObj.roomname = $("#room").val();
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(messageObj),
      contentType: 'application/json',
      success: function () {
        console.log('message sent');
      },
      error: function () {
        console.log('message not sent');
      }
    });
  });

  setInterval(function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function (data) {
        addNewMessages(data.results);
        generateRoomList();
        displayMessages();
      },
      error: function () {
      }
    });
  }, 100);

});