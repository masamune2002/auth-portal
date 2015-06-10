function displayGif(query) {
  $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + query, function (response) {
    $("#status-gif").html('<center><img src = "' + response.data.image_url + '"  title="GIF via Giphy"></center>');
  });
}

function getUser() {
  var user = {
    username: $('#user-field').val(),
    password: $('#password-field').val()
  };
  return user;
}

function displayMessage(message, tag) {
  $('#message').text(message);
  displayGif(tag);
}

$(document).ready(function () {
  $('#login').click(function () {
    $.post("login", getUser(), function (data) {
      if (data) {
        displayMessage("Authentication successful!", "success");
      }
    }).error(function (error) {
      console.log(error);
      displayMessage("Authentication failed!", "fail");
    });
  });

  $('#signup').click(function () {
    $.post("signup", getUser(), function (data) {
      if (data) {
        displayMessage("User " + data.username + " created successfully!", "success");
      }
    }).error(function (error) {
      console.log(error);
      displayMessage("User was unable to be created!", "fail");
    });
  });

  $('#delete').click(function () {
    var user = {
      username: $('#delete-field').val(),
    };

    $.post("deleteUser", user, function (data) {
      if (data) {
        displayMessage("User " + data.username + " deleted successfully!", "success");
      }
    }).error(function (error) {
      console.log(error);
      displayMessage("User was unable to be deleted!", "fail");
    });
  });

});
