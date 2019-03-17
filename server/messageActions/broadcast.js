const getTime = require('../functions/getTime')

let broadcast = function (socket, message, clients) {
    let date = new Date;
    let time = getTime(date)

    let data = JSON.stringify({
        type: 'chat',
        name: socket.name,
        nickname: socket.nickname,
        id: socket.id,
        base64image: socket.base64image,
        text: message.text,
        time: time
    })

    for (let client in clients) {
        clients[client].send(data);
    }
}

module.exports = broadcast