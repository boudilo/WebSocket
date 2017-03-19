// Создание подключения
var socket = new WebSocket("ws://localhost:3000");

socket.onopen = function () {
    var postfix = new Date();
    postfix = postfix.getTime();
    socket.send("{\"login\":" + "\"tema" + postfix + "\"}");
}

// Отправка сообщения из формы
document.forms.publish.onsubmit = function () {
    var outgoingMessage = this.message.value;

    socket.send("{\"message\":\"" + outgoingMessage + "\"}");
    return false;
};

// Обработка входящих сообщений
socket.onmessage = function (event) {
    var incomingMessage = event.data;
    showMessage(incomingMessage);
};

// Отображение сообщений от сервера в div#subscribe
function showMessage(message) {
    var messageElem = document.createElement('p');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').appendChild(messageElem);
}