'use strict'

let sendUsersList = function (clients) {
    let userlist = [];

    for (let client in clients) {
        let clientData = {
            name: clients[client].name,
            nickname: clients[client].nickname
        }

        userlist.push(clientData)
    }

    let data = JSON.stringify({
        type: 'userlist',
        userlist: userlist
    })

    for (let client in clients) {
        clients[client].send(data);
    }
}

module.exports = sendUsersList