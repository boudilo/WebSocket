var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');
var url = require('url');

// Клиенты
var clients = {};

// WebSocket-сервер на порту 3000
var webSocketServer = new WebSocketServer.Server({
    port: 3000
});
webSocketServer.on('connection', function (ws) {

    var client = url.parse(ws.upgradeReq.url, true).query
    clients[client.login] = ws;
    console.log("Новое соединение: " + client.login);

    for (var key in clients) {
        if (key != client.login) {
            clients[key].send("Подключился логин: " + client.login);
        }
    }

    ws.on('message', function (message) {

        var parsedMsg = JSON.parse(message);

        if (parsedMsg.message != undefined) {
            console.log('Получено сообщение: ' + parsedMsg.message);
            
            var messageSender;
            console.log(messageSender);
			console.log(ws.upgradeReq.url);
			messageSender = url.parse(ws.upgradeReq.url, true).query.login;
            console.log("Ищем отправителя: " + messageSender);

            for (var key in clients) {
				console.log("Указываем отправителя: " + messageSender);
                console.log("Отправляю сообщение: \"" + messageSender + ": " + parsedMsg.message + "\"");
                clients[key].send(messageSender + ": " + parsedMsg.message);
            }
        }

    });

    ws.on('close', function () {
        console.log('Соединение закрыто: ' + client.login);
        delete clients[client.login];
    });

});