var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');

// Клиенты
var clients = [];

// WebSocket-сервер на порту 3000
var webSocketServer = new WebSocketServer.Server({
    port: 3000
});
webSocketServer.on('connection', function (ws) {

    var id = Math.random();
    clients[id] = ws;
    console.log("Новое соединение: " + id);

    ws.on('message', function (message) {

        var parsedMsg = JSON.parse(message);

        if (parsedMsg.login != undefined) {
            console.log('Подключился логин: ' + parsedMsg.login);
            console.log("Отправляю сообщение: " + "\"Подключился логин: " + parsedMsg.login + "\"");
            ws.send("Подключился логин: " + parsedMsg.login);
        }

        if (parsedMsg.message != undefined) {
            console.log('Получено сообщение: ' + parsedMsg.message);
            for (var key in clients) {
                console.log("Отправляю сообщение: \"Пишут: " + parsedMsg.message + "\"");
                clients[key].send("пишут: " + parsedMsg.message);
            }
        }

    });

    ws.on('close', function () {
        console.log('Соединение закрыто: ' + id);
        delete clients[id];
    });

});