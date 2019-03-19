'use strict'

let sendUsersCount = function (clients) {
    let count = 0;

    for (let client in clients) {
        // проверка нужна чтобы в usercount-e не считались неавторизованные участники
        if (clients[client].nickname) {
            ++count
        }
    }

    let data = JSON.stringify({
        type: 'count',
        count: count
    })

    for (let client in clients) {
        clients[client].send(data);
    }
}

module.exports = sendUsersCount