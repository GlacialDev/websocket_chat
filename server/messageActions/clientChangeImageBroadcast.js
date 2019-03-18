'use strict'


let clientChangeImageBroadcast = function (socket, clients) {
    let data = JSON.stringify({
        type: 'client_change_image',
        nickname: socket.nickname,
        base64image: socket.base64image,
    })

    for (let client in clients) {
        clients[client].send(data);
    }
}

module.exports = clientChangeImageBroadcast