var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');

// Клиенты
var clients = {};

// WebSocket-сервер на порту 3000
var webSocketServer = new WebSocketServer.Server({
  port: 3000
});
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("Новое соединение: " + id);

  ws.on('message', function(message) {
    console.log('Получено сообщение: ' + message);

    for (var key in clients) {
      clients[key].send("Вы написали сообщение: " + message);
    }
  });

  ws.on('close', function() {
    console.log('Соединение закрыто: ' + id);
    delete clients[id];
  });

});