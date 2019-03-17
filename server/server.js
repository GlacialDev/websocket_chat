const WebSocketServer = new require('ws');
const uuidv1 = require('uuid/v1');
const authorize = require('./messageActions/authorize');
const sendUsersCount = require('./messageActions/sendUsersCount');
const sendUsersList = require('./messageActions/sendUsersList');
const broadcast = require('./messageActions/broadcast');
// подключенные клиенты
let clients = {};

const webSocketServer = new WebSocketServer.Server({
    port: 8080
});
console.log("Сервер запущен на порте: 8080");

webSocketServer.on('connection', function (socket) {
    const id = uuidv1();

    clients[id] = socket;
    console.log("новое соединение " + id);

    socket.on('message', (message) => {
        message = JSON.parse(message);

        switch (message.type) {
            // 2) прилетает с клиента сообщение из формы авторизации, здесь сообщению передается id сокета
            // с которого это прилетело и происходит авторизация (сокету присваиваются параметры из сообщения)
            // обратно летит сообщение с типом 'authorized', которое обрабатывается на клиенте под цифрой 3)
            case 'authorization':
                message.id = id;
                authorize(socket, message);
                sendUsersCount(clients);
                sendUsersList(clients);
                break;
            case 'chat':
                broadcast(socket, message, clients)
                break;
            default:
                break;
        }
    });

    socket.on('close', function () {
        console.log('соединение закрыто ' + id);
        delete clients[id];
        sendUsersCount(clients);
        sendUsersList(clients);
    });

});
