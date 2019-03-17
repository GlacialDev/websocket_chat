let authorize = function (socket, message) {
    socket.name = message.name;
    socket.nickname = message.nickname;
    socket.id = message.id;
    socket.base64image = message.base64image;

    let data = JSON.stringify({
        type: 'authorized',
        name: message.name,
        nickname: message.nickname,
        id: message.id,
        base64image: message.base64image
    })

    socket.send(data)
}

module.exports = authorize