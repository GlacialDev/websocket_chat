'use strict'

let sendChatHistory = function (db, socket) {
    let chatHistory = db.get('chatHistory').value();

    let data = JSON.stringify({
        type: 'chat_history',
        chatHistory: chatHistory
    })

    socket.send(data);
}

module.exports = sendChatHistory