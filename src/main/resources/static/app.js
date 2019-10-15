var stompClient;

function toggle() {
  if (stompClient && stompClient.connected) {
    close();
  } else {
    subscribe();
  }
}

function append(text) {
  var content = document.getElementById('content');
  content.innerHTML = content.innerHTML + '<p>' + text + '</p>';
}

function subscribe() {
  var socket = new SockJS("/app-ws");
  stompClient = StompJs.Stomp.over(socket);
  stompClient.connect({}, function(frame) {
    console.log("Connected: " + frame);
    append('Connected !');
    stompClient.subscribe("/app/test/42", message => {
      console.log("message received", message);
      append('Message received : ' + JSON.parse(message.body));
    });
  });
}

function close() {
  console.log('closing...');
  stompClient.deactivate();
  append('Closing...');
}
