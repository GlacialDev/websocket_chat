'use strict'

const getTime = require('../functions/getTime')

let saveMessageInChatHistory = function (db, socket, message) {
    console.log('saved ' + message.text + ' || author: ' + socket.nickname);

    let date = new Date;
    let time = getTime(date)

    db
        .get('chatHistory')
        .push({
            name: socket.name,
            nickname: socket.nickname,
            id: socket.id,
            base64image: socket.base64image,
            text: message.text,
            time: time
        })
        .write()
}

module.exports = saveMessageInChatHistory